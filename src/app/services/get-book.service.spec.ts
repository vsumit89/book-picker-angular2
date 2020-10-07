import { TestBed } from '@angular/core/testing';

import { GetBookService } from './get-book.service';

describe('GetBookService', () => {
  let service: GetBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
