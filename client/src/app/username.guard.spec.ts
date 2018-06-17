import { TestBed, async, inject } from '@angular/core/testing';

import { UsernameGuard } from './username.guard';

describe('UsernameGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsernameGuard]
    });
  });

  it('should ...', inject([UsernameGuard], (guard: UsernameGuard) => {
    expect(guard).toBeTruthy();
  }));
});
