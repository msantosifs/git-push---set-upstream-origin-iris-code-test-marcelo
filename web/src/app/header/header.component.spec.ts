import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {MatToolbarModule} from "@angular/material/toolbar";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ MatToolbarModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display logo', () => {
    const logoElement = el.querySelector('.logo-img');
    // Check it is an <img> element and it has the correct src
    expect(logoElement).toBeTruthy();
    expect(logoElement?.localName).toBe('img');
    expect(logoElement?.getAttribute('src')).toBe('../../assets/jira-logo-scaled.png');
    expect(logoElement?.getAttribute('alt')).toBe('image');
  });

  it('should contain a toolbar', () => {
    const toolbarElement = el.querySelector('mat-toolbar');
    expect(toolbarElement).toBeTruthy();
  });
});
