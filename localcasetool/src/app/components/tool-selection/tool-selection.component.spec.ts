import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSelectionComponent } from './tool-selection.component';

describe('ToolSelectionComponent', () => {
  let component: ToolSelectionComponent;
  let fixture: ComponentFixture<ToolSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolSelectionComponent]
    });
    fixture = TestBed.createComponent(ToolSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
