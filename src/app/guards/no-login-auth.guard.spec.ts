import { TestBed, async, inject } from '@angular/core/testing';

import { NoLoginAuthGuard } from './no-login-auth.guard';

describe('NoLoginAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoLoginAuthGuard]
    });
  });

  it('should ...', inject([NoLoginAuthGuard], (guard: NoLoginAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
