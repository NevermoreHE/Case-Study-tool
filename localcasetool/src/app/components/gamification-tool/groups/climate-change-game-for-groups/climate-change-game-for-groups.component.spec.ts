import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateChangeGameForGroupsComponent } from './climate-change-game-for-groups.component';

describe('ClimateChangeGameForGroupsComponent', () => {
  let component: ClimateChangeGameForGroupsComponent;
  let fixture: ComponentFixture<ClimateChangeGameForGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClimateChangeGameForGroupsComponent]
    });
    fixture = TestBed.createComponent(ClimateChangeGameForGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
