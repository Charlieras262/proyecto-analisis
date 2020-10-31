import { TestBed } from '@angular/core/testing';

import { HistoriesService } from './histories.service';

describe('HistoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoriesService = TestBed.get(HistoriesService);
    expect(service).toBeTruthy();
  });
});
