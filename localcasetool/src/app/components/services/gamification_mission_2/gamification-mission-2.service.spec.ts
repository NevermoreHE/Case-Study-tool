import { TestBed } from '@angular/core/testing';

import { GamificationMission2Service } from './gamification-mission-2.service';

describe('GamificationMission2Service', () => {
  let service: GamificationMission2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamificationMission2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
