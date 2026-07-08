import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioAppliedResultsComponent } from './scenario-applied-results.component';

describe('ScenarioAppliedResultsComponent', () => {
  let component: ScenarioAppliedResultsComponent;
  let fixture: ComponentFixture<ScenarioAppliedResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioAppliedResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioAppliedResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
