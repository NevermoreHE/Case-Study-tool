import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalResultsForGroupsComponent } from './final-results-for-groups.component';

describe('FinalResultsForGroupsComponent', () => {
  let component: FinalResultsForGroupsComponent;
  let fixture: ComponentFixture<FinalResultsForGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalResultsForGroupsComponent]
    });
    fixture = TestBed.createComponent(FinalResultsForGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
