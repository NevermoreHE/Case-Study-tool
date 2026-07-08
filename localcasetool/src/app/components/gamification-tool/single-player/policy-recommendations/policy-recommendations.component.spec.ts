import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyRecommendationsComponent } from './policy-recommendations.component';

describe('PolicyRecommendationsComponent', () => {
  let component: PolicyRecommendationsComponent;
  let fixture: ComponentFixture<PolicyRecommendationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyRecommendationsComponent]
    });
    fixture = TestBed.createComponent(PolicyRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
