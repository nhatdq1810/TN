/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PhongtroService } from './phongtro.service';

describe('Service: Phongtro', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhongtroService]
    });
  });

  it('should ...', inject([PhongtroService], (service: PhongtroService) => {
    expect(service).toBeTruthy();
  }));
});
