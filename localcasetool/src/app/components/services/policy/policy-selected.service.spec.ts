import { TestBed } from '@angular/core/testing';

import { PolicySelectedService } from './policy-selected.service';

describe('PolicySelectedService', () => {
  let service: PolicySelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicySelectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
