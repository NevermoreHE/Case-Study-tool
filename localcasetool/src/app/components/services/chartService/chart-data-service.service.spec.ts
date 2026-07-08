import { TestBed } from '@angular/core/testing';

import { ChartDataServiceService } from './chart-data-service.service';

describe('ChartDataServiceService', () => {
  let service: ChartDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
