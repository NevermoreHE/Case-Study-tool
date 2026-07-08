import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EuScaleToolInfoComponent } from './eu-scale-tool-info.component';

describe('EuScaleToolInfoComponent', () => {
  let component: EuScaleToolInfoComponent;
  let fixture: ComponentFixture<EuScaleToolInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EuScaleToolInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EuScaleToolInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
