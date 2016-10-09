import { Injectable, EventEmitter } from '@angular/core';
import { Phongtro } from '../models/phongtro';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


let Constants = require('../resources/constants');

@Injectable()
export class PhongtroService {

  private _listPT: any[];

  constructor(private http: Http) { }

  get listPT(): any[]{
    return this._listPT;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  layTatcaPhongtro(): Observable<Phongtro[]>{
    return this.http
      .get(Constants.apiUrl + 'phongtro/tatca', { headers: Constants.headers })
      .map((resp: Response) => resp.json());
  }

  timkiemPhongtro(model): Promise<any>{
    return new Promise((resolve) => {
      this.http.get(Constants.apiUrl + `phongtro/timkiem?giatien_min=${model.giatien[0]}&giatien_max=${model.giatien[1]}&truong=${model.truong}&nganh=${model.nganh}&gioitinh=${model.gioitinh}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(listPT => {
          this._listPT = listPT;
          resolve('success');
        },
        error => this.handleError(error));
    });
  }
}
