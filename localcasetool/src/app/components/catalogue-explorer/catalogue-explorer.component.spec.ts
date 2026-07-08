import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueExplorerComponent } from './catalogue-explorer.component';

describe('CatalogueExplorerComponent', () => {
  let component: CatalogueExplorerComponent;
  let fixture: ComponentFixture<CatalogueExplorerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogueExplorerComponent]
    });
    fixture = TestBed.createComponent(CatalogueExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
