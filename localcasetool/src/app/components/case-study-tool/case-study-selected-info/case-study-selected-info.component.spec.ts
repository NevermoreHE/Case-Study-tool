import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudySelectedInfoComponent } from './case-study-selected-info.component';

describe('CaseStudySelectedInfoComponent', () => {
  let component: CaseStudySelectedInfoComponent;
  let fixture: ComponentFixture<CaseStudySelectedInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseStudySelectedInfoComponent]
    });
    fixture = TestBed.createComponent(CaseStudySelectedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
