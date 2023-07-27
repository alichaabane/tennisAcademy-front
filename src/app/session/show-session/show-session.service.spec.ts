import { TestBed } from '@angular/core/testing';

import { ShowSessionService } from './show-session.service';

describe('ShowSessionService', () => {
  let service: ShowSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
