import {SortKey, Subdivision, SUBDIVISION_TABLE_CONFIG} from "../models/subdivision.model";
import {SubdivisionService} from "../services/subdivision.service";
import {BehaviorSubject, combineLatest} from "rxjs";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from "@angular/core";

/**
 * Component for displaying subdivision data.
 */
@Component({
  selector: 'app-subdivision-data-display',
  templateUrl: './subdivision-data-display.component.html',
  styleUrls: ['./subdivision-data-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubdivisionDataDisplayComponent implements OnInit {
  protected readonly PAGE_SIZE: number = 50;

  rawSubdivisions: Subdivision[] = [];
  subdivisions: Subdivision[] = [];

  filteredSize = 0;

  tableConfig = SUBDIVISION_TABLE_CONFIG;

  private filter$ = new BehaviorSubject<string>('');
  private sortOrder$ = new BehaviorSubject<{ property: SortKey; direction: 'asc' | 'desc'; }>({
    property: 'activeSections' as SortKey,
    direction: 'asc',
  });
  public currentPage$ = new BehaviorSubject<number>(1);

  constructor(
      private subdivisionService: SubdivisionService,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subdivisionService.getSubdivisions()
        .subscribe(data => {
          this.rawSubdivisions = data;
          this.filterAndSortData(); // initial filter and sort
        });

    combineLatest([
      this.filter$,
      this.sortOrder$,
      this.currentPage$
    ])
        .subscribe(([filter, sortOrder, currentPage]) => {
          this.filterAndSortData();
        });
  }

  /**
   * Filters and sorts the data based on filter and sort order.
   * Modifies the subdivisions array and updates the filteredSize and subdivisions properties.
   */
  private filterAndSortData() {
    const filter = this.filter$.getValue();
    const sortOrder = this.sortOrder$.getValue();
    let subdivisions = [...this.rawSubdivisions];  // clone the original data

    // filter
    if (filter) {
      subdivisions = subdivisions.filter(
          subdivision => subdivision.subdivisionStatusCode.toLowerCase().includes(filter.toLowerCase())
      );
    }

    this.filteredSize = subdivisions.length;

    // sort
    subdivisions.sort((a, b) => this.compare(a[sortOrder.property], b[sortOrder.property], sortOrder.direction));

    // paginate
    const start = (this.currentPage$.getValue() - 1) * this.PAGE_SIZE;
    this.subdivisions = subdivisions.slice(start, start + this.PAGE_SIZE);

    this.cdr.detectChanges();
  }

  /**
   * Compares two values and returns a comparison result based on the specified direction.
   */
  private compare(a: any, b: any, direction: any) {
    let comparison = 0;
    if (a > b) {
      comparison = 1;
    } else if (a < b) {
      comparison = -1;
    }
    return direction === 'desc' ? comparison * -1 : comparison;
  }

  /**
   * Updates the filter value and triggers a change in the filter observable
   * Additionally, it sets the current page to 1 to reset the pagination.
   */
  onFilterChange(target: any) {
    const filter = target.value.toLowerCase();
    this.filter$.next(filter);
    this.currentPage$.next(1);
  }

  /**
   * Handles the change in sorting order.
   */
  onSortChange(property: SortKey) {
    const direction = this.sortOrder$.getValue().property !== property || this.sortOrder$.getValue().direction === 'desc' ? 'asc' : 'desc';
    this.sortOrder$.next({property, direction});
  }

  /**
   * Changes the current page based on the given delta value.
   */
  changePage(delta: number) {
    const newPage = this.currentPage$.getValue() + delta;
    const nextPageStartIndex = (newPage - 1) * this.PAGE_SIZE;
    if (nextPageStartIndex < this.rawSubdivisions.length && newPage > 0) {
      this.currentPage$.next(newPage);
    }
  }

  /**
   * Gets the style object based on the given configuration.
   */
  getStyle(config: any) {
    return {
      'width': config.width ? `${config.width}px` : '100px',
      'max-width': config.width ? `${config.width}px` : '100px',
      'min-width': config.width ? `${config.width}px` : '100px'
    };
  }
}
