import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateChangeAdaptationComponent } from './climate-change-adaptation.component';

describe('ClimateChangeAdaptationComponent', () => {
  let component: ClimateChangeAdaptationComponent;
  let fixture: ComponentFixture<ClimateChangeAdaptationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClimateChangeAdaptationComponent]
    });
    fixture = TestBed.createComponent(ClimateChangeAdaptationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
