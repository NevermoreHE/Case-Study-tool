import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueExplorerInfoComponent } from './catalogue-explorer-info.component';

describe('CatalogueExplorerInfoComponent', () => {
  let component: CatalogueExplorerInfoComponent;
  let fixture: ComponentFixture<CatalogueExplorerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogueExplorerInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogueExplorerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
