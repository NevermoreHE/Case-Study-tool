import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamificationIntroPageComponent } from './gamification-intro-page.component';

describe('GamificationIntroPageComponent', () => {
  let component: GamificationIntroPageComponent;
  let fixture: ComponentFixture<GamificationIntroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamificationIntroPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamificationIntroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
