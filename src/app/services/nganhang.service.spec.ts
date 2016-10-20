/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NganhangService } from './nganhang.service';

describe('Service: Nganhang', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NganhangService]
    });
  });

  it('should ...', inject([NganhangService], (service: NganhangService) => {
    expect(service).toBeTruthy();
  }));
});
