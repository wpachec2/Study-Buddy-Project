import { TestBed } from '@angular/core/testing';

import { QandAService } from './qand-a.service';

describe('QandAService', () => {
  let service: QandAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QandAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
