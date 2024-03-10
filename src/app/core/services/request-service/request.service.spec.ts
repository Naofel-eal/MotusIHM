import { TestBed } from '@angular/core/testing';

import { WordRepository } from './request.service';

describe('RequestService', () => {
  let service: WordRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
