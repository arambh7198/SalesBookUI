import { TestBed } from '@angular/core/testing';

import { CustvendService } from './custvend.service';

describe('CustvendService', () => {
  let service: CustvendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustvendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
