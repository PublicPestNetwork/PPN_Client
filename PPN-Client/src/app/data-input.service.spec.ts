import { TestBed } from '@angular/core/testing';

import { DataInputService } from './data-input.service';

describe('DataInputService', () => {
  let service: DataInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
