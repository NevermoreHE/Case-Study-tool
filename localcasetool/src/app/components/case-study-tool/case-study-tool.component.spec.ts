import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyToolComponent } from './case-study-tool.component';

describe('CaseStudyToolComponent', () => {
  let component: CaseStudyToolComponent;
  let fixture: ComponentFixture<CaseStudyToolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseStudyToolComponent]
    });
    fixture = TestBed.createComponent(CaseStudyToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
