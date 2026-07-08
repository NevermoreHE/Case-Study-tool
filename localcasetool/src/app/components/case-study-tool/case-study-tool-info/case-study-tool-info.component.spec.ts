import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyToolInfoComponent } from './case-study-tool-info.component';

describe('CaseStudyToolInfoComponent', () => {
  let component: CaseStudyToolInfoComponent;
  let fixture: ComponentFixture<CaseStudyToolInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseStudyToolInfoComponent]
    });
    fixture = TestBed.createComponent(CaseStudyToolInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
