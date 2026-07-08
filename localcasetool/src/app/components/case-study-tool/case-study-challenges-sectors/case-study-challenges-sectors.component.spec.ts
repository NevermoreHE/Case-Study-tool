import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyChallengesSectorsComponent } from './case-study-challenges-sectors.component';

describe('CaseStudyChallengesSectorsComponent', () => {
  let component: CaseStudyChallengesSectorsComponent;
  let fixture: ComponentFixture<CaseStudyChallengesSectorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseStudyChallengesSectorsComponent]
    });
    fixture = TestBed.createComponent(CaseStudyChallengesSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
