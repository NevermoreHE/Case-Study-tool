import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyRecommendationsForGroupComponent } from './policy-recommendations-for-group.component';

describe('PolicyRecommendationsForGroupComponent', () => {
  let component: PolicyRecommendationsForGroupComponent;
  let fixture: ComponentFixture<PolicyRecommendationsForGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyRecommendationsForGroupComponent]
    });
    fixture = TestBed.createComponent(PolicyRecommendationsForGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
