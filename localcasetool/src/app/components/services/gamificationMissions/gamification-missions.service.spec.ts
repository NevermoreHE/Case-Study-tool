import { TestBed } from '@angular/core/testing';

import { GamificationMissionsService } from './gamification-missions.service';

describe('GamificationMissionsService', () => {
  let service: GamificationMissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamificationMissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
