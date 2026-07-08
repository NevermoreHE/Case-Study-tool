import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EuScaleToolComponent } from './eu-scale-tool.component';

describe('EuScaleToolComponent', () => {
  let component: EuScaleToolComponent;
  let fixture: ComponentFixture<EuScaleToolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EuScaleToolComponent]
    });
    fixture = TestBed.createComponent(EuScaleToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
