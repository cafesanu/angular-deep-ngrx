import { TestBed } from '@angular/core/testing';

import { RecipesGuardService } from './recipes-guard.service';

describe('RecipesGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipesGuardService = TestBed.get(RecipesGuardService);
    expect(service).toBeTruthy();
  });
});
