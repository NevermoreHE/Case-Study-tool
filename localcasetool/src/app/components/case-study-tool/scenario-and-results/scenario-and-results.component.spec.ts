import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioAndResultsComponent } from './scenario-and-results.component';

describe('ScenarioAndResultsComponent', () => {
  let component: ScenarioAndResultsComponent;
  let fixture: ComponentFixture<ScenarioAndResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioAndResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioAndResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
