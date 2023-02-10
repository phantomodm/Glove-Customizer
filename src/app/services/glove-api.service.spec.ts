import { TestBed } from '@angular/core/testing';

import { GloveApiService } from './glove-api.service';

describe('GloveApiService', () => {
  let service: GloveApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GloveApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
