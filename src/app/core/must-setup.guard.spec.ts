import { TestBed, async, inject } from '@angular/core/testing';

import { MustSetupGuard } from './must-setup.guard';

describe('MustSetupGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MustSetupGuard]
    });
  });

  it('should ...', inject([MustSetupGuard], (guard: MustSetupGuard) => {
    expect(guard).toBeTruthy();
  }));
});
