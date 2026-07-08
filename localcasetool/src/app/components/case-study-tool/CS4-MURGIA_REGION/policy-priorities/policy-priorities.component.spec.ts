import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPrioritiesComponent } from './policy-priorities.component';

describe('PolicyPrioritiesComponent', () => {
  let component: PolicyPrioritiesComponent;
  let fixture: ComponentFixture<PolicyPrioritiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyPrioritiesComponent]
    });
    fixture = TestBed.createComponent(PolicyPrioritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
