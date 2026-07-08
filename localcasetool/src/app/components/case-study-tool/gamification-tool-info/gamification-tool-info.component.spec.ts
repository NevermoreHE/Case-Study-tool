import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamificationToolInfoComponent } from './gamification-tool-info.component';

describe('GamificationToolInfoComponent', () => {
  let component: GamificationToolInfoComponent;
  let fixture: ComponentFixture<GamificationToolInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamificationToolInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamificationToolInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
