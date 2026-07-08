import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateChangeGameComponent } from './climate-change-game.component';

describe('ClimateChangeGameComponent', () => {
  let component: ClimateChangeGameComponent;
  let fixture: ComponentFixture<ClimateChangeGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClimateChangeGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClimateChangeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
