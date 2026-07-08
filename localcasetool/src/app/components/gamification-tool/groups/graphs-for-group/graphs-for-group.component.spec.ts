import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphsForGroupComponent } from './graphs-for-group.component';

describe('GraphsForGroupComponent', () => {
  let component: GraphsForGroupComponent;
  let fixture: ComponentFixture<GraphsForGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphsForGroupComponent]
    });
    fixture = TestBed.createComponent(GraphsForGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
