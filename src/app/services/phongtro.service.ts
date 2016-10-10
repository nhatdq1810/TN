import { Injectable, EventEmitter } from '@angular/core';
import { Phongtro } from '../models/phongtro';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


let Constants = require('../resources/constants');

@Injectable()
export class PhongtroService {

  private _listTKPT: any[];

  constructor(private http: Http, private router: Router) { }

  get listPT(): any[]{
    return this._listTKPT;
  }

  private handleError(funcName: string, error: any): Promise<any> {
    console.error(funcName + ' has error ', error);
    this.router.navigate(['/404']);
    return Promise.reject(error.message || error);
  }

  layTatcaPhongtro(): Promise<any>{
    return new Promise((resolve) => {
      this.http
        .get(Constants.apiUrl + 'phongtro/tatca', { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(listPT => {
          resolve(listPT);
        },
        error => this.handleError('layTatcaPhongtro', error));
    });
  }

  timkiemPhongtro(model): Promise<any>{
    return new Promise((resolve) => {
      this.http.get(Constants.apiUrl + `phongtro/timkiem?giatien_min=${model.giatien[0]}&giatien_max=${model.giatien[1]}&truong=${model.truong}&nganh=${model.nganh}&gioitinh=${model.gioitinh}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(listPT => {
          this._listTKPT = listPT;
          resolve('success');
        },
        error => this.handleError('timkiemPhongtro', error));
    });
  }
}
