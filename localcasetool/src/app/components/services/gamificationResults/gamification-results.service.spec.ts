import { TestBed } from '@angular/core/testing';

import { GamificationResultsService } from './gamification-results.service';

describe('GamificationResultsService', () => {
  let service: GamificationResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamificationResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
