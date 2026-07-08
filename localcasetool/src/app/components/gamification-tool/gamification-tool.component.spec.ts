import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamificationToolComponent } from './gamification-tool.component';

describe('GamificationToolComponent', () => {
  let component: GamificationToolComponent;
  let fixture: ComponentFixture<GamificationToolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamificationToolComponent]
    });
    fixture = TestBed.createComponent(GamificationToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
