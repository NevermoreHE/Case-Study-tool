import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptationIndicatorsComponent } from './adaptation-indicators.component';

describe('AdaptationIndicatorsComponent', () => {
  let component: AdaptationIndicatorsComponent;
  let fixture: ComponentFixture<AdaptationIndicatorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdaptationIndicatorsComponent]
    });
    fixture = TestBed.createComponent(AdaptationIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
