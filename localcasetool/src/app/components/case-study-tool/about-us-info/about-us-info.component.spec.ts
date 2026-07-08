import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsInfoComponent } from './about-us-info.component';

describe('AboutUsInfoComponent', () => {
  let component: AboutUsInfoComponent;
  let fixture: ComponentFixture<AboutUsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
