import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsAndRisksComponent } from './assets-and-risks.component';

describe('AssetsAndRisksComponent', () => {
  let component: AssetsAndRisksComponent;
  let fixture: ComponentFixture<AssetsAndRisksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsAndRisksComponent]
    });
    fixture = TestBed.createComponent(AssetsAndRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
