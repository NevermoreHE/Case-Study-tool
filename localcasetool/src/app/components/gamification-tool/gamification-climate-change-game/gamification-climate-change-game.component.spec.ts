import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamificationClimateChangeGameComponent } from './gamification-climate-change-game.component';

describe('GamificationClimateChangeGameComponent', () => {
  let component: GamificationClimateChangeGameComponent;
  let fixture: ComponentFixture<GamificationClimateChangeGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamificationClimateChangeGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamificationClimateChangeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
