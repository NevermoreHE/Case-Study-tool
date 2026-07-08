import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyRelevantSectorsComponent } from './case-study-relevant-sectors.component';

describe('CaseStudyRelevantSectorsComponent', () => {
  let component: CaseStudyRelevantSectorsComponent;
  let fixture: ComponentFixture<CaseStudyRelevantSectorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseStudyRelevantSectorsComponent]
    });
    fixture = TestBed.createComponent(CaseStudyRelevantSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
