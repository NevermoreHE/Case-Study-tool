import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedPoliciesComponent } from './recommended-policies.component';

describe('RecommendedPoliciesComponent', () => {
  let component: RecommendedPoliciesComponent;
  let fixture: ComponentFixture<RecommendedPoliciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendedPoliciesComponent]
    });
    fixture = TestBed.createComponent(RecommendedPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
