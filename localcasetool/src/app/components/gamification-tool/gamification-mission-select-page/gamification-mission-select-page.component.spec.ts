import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamificationMissionSelectPageComponent } from './gamification-mission-select-page.component';

describe('GamificationMissionSelectPageComponent', () => {
  let component: GamificationMissionSelectPageComponent;
  let fixture: ComponentFixture<GamificationMissionSelectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamificationMissionSelectPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamificationMissionSelectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
