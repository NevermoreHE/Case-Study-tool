import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECVComponent } from './ecv.component';

describe('ECVComponent', () => {
  let component: ECVComponent;
  let fixture: ComponentFixture<ECVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ECVComponent]
    });
    fixture = TestBed.createComponent(ECVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
