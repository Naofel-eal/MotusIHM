import { TestBed } from '@angular/core/testing';

import { WordRepository } from './word.repository';

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
