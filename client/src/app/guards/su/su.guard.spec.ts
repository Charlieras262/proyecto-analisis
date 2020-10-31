import { TestBed, async, inject } from '@angular/core/testing';

import { SuGuard } from './su.guard';

describe('SuGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuGuard]
    });
  });

  it('should ...', inject([SuGuard], (guard: SuGuard) => {
    expect(guard).toBeTruthy();
  }));
});
