import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamificationMissionResultsComponent } from './gamification-mission-results.component';

describe('GamificationMissionResultsComponent', () => {
  let component: GamificationMissionResultsComponent;
  let fixture: ComponentFixture<GamificationMissionResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamificationMissionResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamificationMissionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
