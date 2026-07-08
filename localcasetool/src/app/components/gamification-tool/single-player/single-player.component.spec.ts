import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlayerComponent } from './single-player.component';

describe('SinglePlayerComponent', () => {
  let component: SinglePlayerComponent;
  let fixture: ComponentFixture<SinglePlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePlayerComponent]
    });
    fixture = TestBed.createComponent(SinglePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
