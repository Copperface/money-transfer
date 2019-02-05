import { TestBed } from '@angular/core/testing';

import { LocalStorageHelperService } from './local-storage-helper.service';

describe('LocalStorageHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalStorageHelperService = TestBed.get(LocalStorageHelperService);
    expect(service).toBeTruthy();
  });
});
