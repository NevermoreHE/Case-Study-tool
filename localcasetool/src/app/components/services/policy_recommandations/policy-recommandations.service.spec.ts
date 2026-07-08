import { TestBed } from '@angular/core/testing';

import { PolicyRecommandationsService } from './policy-recommandations.service';

describe('PolicyRecommandationsService', () => {
  let service: PolicyRecommandationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyRecommandationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
