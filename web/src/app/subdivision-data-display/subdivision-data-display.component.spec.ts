import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivisionDataDisplayComponent } from './subdivision-data-display.component';
import {SubdivisionService} from "../services/subdivision.service";
import {of} from "rxjs";
import {TooltipDirective} from "../directives/tooltip.directive";
import {ToDatePipe} from "../pipes/to-date.pipe";

describe('SubdivisionDataDisplayComponent', () => {
  let component: SubdivisionDataDisplayComponent;
  let fixture: ComponentFixture<SubdivisionDataDisplayComponent>;

  const mockSubdivisionService = {
    getSubdivisions: jasmine.createSpy('getSubdivisions').and.returnValue(of([
      {
        "id": 26951,
        "code": "001B3",
        "name": "Alexander Park",
        "longitude": -115.07067,
        "latitude": 36.233263,
        "fieldSurveyTerritoryId": 3782,
        "marketId": 16,
        "subdivisionStatusId": 2,
        "surveyMethodId": 2,
        "activeSections": 0,
        "futureSections": 1,
        "builtOutSections": 2,
        "totalLots": 237,
        "fieldSurveyTerritoryName": "EldorBI",
        "marketName": "Las Vegas",
        "marketAbbreviation": "LV",
        "subdivisionStatusCode": "Future",
        "surveyMethodCode": "DRIVE",
        "county": "Clark",
        "community": null,
        "zoom17Date": "2023-08-11T18:20:25.557Z",
        "zoom18Date": "2023-08-11T18:20:25.557Z",
        "subdivisionGeometryId": null,
        "subdivisionGeometryBoundingBoxId": null,
        "subdivisionGeometryBoundaryId": null,
        "subdivisionGeometryIntelligenceBoundaryId": 24714,
        "subdivisionGeometryIntelligenceBoundaryStatusId": 4,
        "subdivisionGeometryIntelligenceBoundaryStatusCode": "Finalized",
        "subdivisionGeometryIntelligenceBoundaryStatusChangeDate": "2022-07-14T04:41:38.403Z",
        "nearMapImageDate": "2023-06-17T18:02:42.000Z",
        "imageBoxId": 59809,
        "mostRecentIPointBatchDate": "2023-07-07T00:00:00.000Z",
        "iPoints": null,
        "validatediPoints": null,
        "subdivisionSpecificStatus": "Future"
      },
      {
        "id": 26952,
        "code": "001D7",
        "name": "Searchlight and Airpark",
        "longitude": -114.91801,
        "latitude": 35.460599,
        "fieldSurveyTerritoryId": 1693,
        "marketId": 16,
        "subdivisionStatusId": 2,
        "surveyMethodId": 2,
        "activeSections": 0,
        "futureSections": 1,
        "builtOutSections": 0,
        "totalLots": 32,
        "fieldSurveyTerritoryName": "Search/Air",
        "marketName": "Las Vegas",
        "marketAbbreviation": "LV",
        "subdivisionStatusCode": "Future",
        "surveyMethodCode": "DRIVE",
        "county": "Clark",
        "community": null,
        "zoom17Date": "2023-07-02T18:02:02.873Z",
        "zoom18Date": "2023-05-19T21:27:14.000Z",
        "subdivisionGeometryId": null,
        "subdivisionGeometryBoundingBoxId": null,
        "subdivisionGeometryBoundaryId": null,
        "subdivisionGeometryIntelligenceBoundaryId": 58509,
        "subdivisionGeometryIntelligenceBoundaryStatusId": 2,
        "subdivisionGeometryIntelligenceBoundaryStatusCode": "Default",
        "subdivisionGeometryIntelligenceBoundaryStatusChangeDate": "2020-08-25T18:16:50.463Z",
        "nearMapImageDate": "2022-07-06T17:13:41.000Z",
        "imageBoxId": 59810,
        "mostRecentIPointBatchDate": null,
        "iPoints": null,
        "validatediPoints": null,
        "subdivisionSpecificStatus": "Future"
      },
    ])),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipDirective, ToDatePipe],
      declarations: [ SubdivisionDataDisplayComponent ],
      providers: [
        { provide: SubdivisionService, useValue: mockSubdivisionService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivisionDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch subdivision records on initialization', () => {
    expect(mockSubdivisionService.getSubdivisions).toHaveBeenCalled();
    expect(component.rawSubdivisions.length).toBeGreaterThan(0); // should fetch at least 1 record
  });

  it('should filter records when onFilterChange is called', () => {
    component.onFilterChange({ value: 'Future' });
    expect(component.subdivisions[0]?.subdivisionStatusCode).toEqual('Future');
  });

  it('should change sortOrder when onSortChange is called', () => {
    component.onSortChange('subdivisionStatusCode');
    expect(component["sortOrder$"].getValue().property).toEqual('subdivisionStatusCode');
  });

  it('should not decrease page when it is already the first page', () => {
    component.currentPage$.next(1)
    component.changePage(-1);
    expect(component.currentPage$.getValue()).toEqual(1);
  });

  it('should not increase page when there is no more data', () => {
    component.rawSubdivisions = Array(50).fill({});
    component.currentPage$.next(1);
    component.changePage(1);
    expect(component.currentPage$.getValue()).toEqual(1);
  });

});
