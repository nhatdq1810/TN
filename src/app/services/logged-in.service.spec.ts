/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoggedInService } from './logged-in.service';

describe('Service: LoggedIn', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedInService]
    });
  });

  it('should ...', inject([LoggedInService], (service: LoggedInService) => {
    expect(service).toBeTruthy();
  }));
});
