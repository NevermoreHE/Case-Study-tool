import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonOfResultsComponent } from './comparison-of-results.component';

describe('ComparisonOfResultsComponent', () => {
  let component: ComparisonOfResultsComponent;
  let fixture: ComponentFixture<ComparisonOfResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComparisonOfResultsComponent]
    });
    fixture = TestBed.createComponent(ComparisonOfResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
