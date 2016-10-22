/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GiaodichService } from './giaodich.service';

describe('Service: Giaodich', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GiaodichService]
    });
  });

  it('should ...', inject([GiaodichService], (service: GiaodichService) => {
    expect(service).toBeTruthy();
  }));
});
