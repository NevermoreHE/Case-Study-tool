import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyScenariosComponent } from './policy-scenarios.component';

describe('PolicyScenariosComponent', () => {
  let component: PolicyScenariosComponent;
  let fixture: ComponentFixture<PolicyScenariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyScenariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyScenariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
