import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyDefinitionsComponent } from './key-definitions.component';

describe('KeyDefinitionsComponent', () => {
  let component: KeyDefinitionsComponent;
  let fixture: ComponentFixture<KeyDefinitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyDefinitionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
