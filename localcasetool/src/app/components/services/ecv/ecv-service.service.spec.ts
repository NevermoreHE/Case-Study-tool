import { TestBed } from '@angular/core/testing';

import { EcvServiceService } from './ecv-service.service';

describe('EcvServiceService', () => {
  let service: EcvServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcvServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
