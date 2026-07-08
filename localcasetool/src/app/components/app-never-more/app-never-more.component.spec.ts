import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNeverMoreComponent } from './app-never-more.component';

describe('AppNeverMoreComponent', () => {
  let component: AppNeverMoreComponent;
  let fixture: ComponentFixture<AppNeverMoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppNeverMoreComponent]
    });
    fixture = TestBed.createComponent(AppNeverMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
