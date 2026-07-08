import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mission2ForGroupsComponent } from './mission-2-for-groups.component';

describe('Mission2ForGroupsComponent', () => {
  let component: Mission2ForGroupsComponent;
  let fixture: ComponentFixture<Mission2ForGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Mission2ForGroupsComponent]
    });
    fixture = TestBed.createComponent(Mission2ForGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
