import { TestBed } from '@angular/core/testing';

import { SubsService } from './subs.service';

describe('SubsService', () => {
  let service: SubsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
