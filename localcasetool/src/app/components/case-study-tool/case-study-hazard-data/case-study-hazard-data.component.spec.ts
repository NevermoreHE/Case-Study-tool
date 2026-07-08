import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyHazardDataComponent } from './case-study-hazard-data.component';

describe('CaseStudyHazardDataComponent', () => {
  let component: CaseStudyHazardDataComponent;
  let fixture: ComponentFixture<CaseStudyHazardDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseStudyHazardDataComponent]
    });
    fixture = TestBed.createComponent(CaseStudyHazardDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
