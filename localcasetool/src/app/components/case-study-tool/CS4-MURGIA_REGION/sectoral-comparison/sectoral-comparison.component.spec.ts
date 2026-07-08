import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectoralComparisonComponent } from './sectoral-comparison.component';

describe('SectoralComparisonComponent', () => {
  let component: SectoralComparisonComponent;
  let fixture: ComponentFixture<SectoralComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectoralComparisonComponent]
    });
    fixture = TestBed.createComponent(SectoralComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
