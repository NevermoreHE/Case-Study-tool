import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mission2Component } from './mission-2.component';

describe('Mission2Component', () => {
  let component: Mission2Component;
  let fixture: ComponentFixture<Mission2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Mission2Component]
    });
    fixture = TestBed.createComponent(Mission2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
