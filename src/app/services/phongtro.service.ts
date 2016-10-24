import { Injectable, EventEmitter } from '@angular/core';
import { Phongtro } from '../models/phongtro';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


let Constants = require('../resources/constants');

@Injectable()
export class PhongtroService {

  private _listTKPT: any[];
  private _currentPT: any;
  private _searchTerm: any;

  constructor(private http: Http, private router: Router) {
    this._listTKPT = [];
  }

  get listPT(): any[]{
    return this._listTKPT;
  }

  get currentPT(): any{
    return this._currentPT;
  }

  get searchTerm(): any {
    return this._searchTerm;
  }

  private handleError(funcName: string, error: any): Observable<any> {
    console.error(funcName + ' has error ', error);
    // this.router.navigate(['/404']);
    return Observable.throw(error.message || error);
  }

  layTatcaPhongtro(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http
        .get(Constants.apiUrl + 'phongtro/tatca', { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('layTatcaPhongtro', resp.result);
            reject(resp.result);
          }
        },
        error => this.handleError('layTatcaPhongtro', error));
    });
  }

  layPhongtro(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(Constants.apiUrl + 'phongtro/' + id, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          if (!resp.result || resp.result !== 'fail') {
            this._currentPT = resp;
            resolve(resp);
          } else {
            this.handleError('layPhongtro', resp.result);
            reject(resp.result);
          }
        },
        error => this.handleError('layPhongtro', error));
    });
  }

  layPhongtroHot(gioihan: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(Constants.apiUrl + 'phongtro/hot?gioihan=' + gioihan, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          if (!resp.result || resp.result !== 'fail') {
            this._listTKPT = resp;
            resolve(resp)
          } else {
            this.handleError('layPhongtroHot', resp.result);
            reject(resp.result);
          }
        },
        error => this.handleError('layPhongtroHot', error));
    });
  }

  layPhongtroMoi(gioihan: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(Constants.apiUrl + 'phongtro/moi?gioihan=' + gioihan, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          if (!resp.result || resp.result !== 'fail') {
            this._listTKPT = resp;
            resolve(resp);
          } else {
            this.handleError('layPhongtroMoi', resp.result);
            reject(resp.result);
          }
        },
        error => this.handleError('layPhongtroMoi', error));
    });
  }

  timkiemPhongtro(model): Promise<any>{
    this._searchTerm = {
      giatien_min: model.giatien[0],
      giatien_max: model.giatien[1],
      truong: model.truong,
      nganh: model.nganh,
      gioitinh: model.gioitinh
    }
    return new Promise((resolve, reject) => {
      resolve('success');
    })
    // return new Promise((resolve, reject) => {
    //   this.http.get(Constants.apiUrl + `phongtro/timkiem?giatien_min=${model.giatien[0]}&giatien_max=${model.giatien[1]}&truong=${model.truong}&nganh=${model.nganh}&gioitinh=${model.gioitinh}`, { headers: Constants.headers })
    //     .map((resp: Response) => resp.json())
    //     .subscribe(resp => {
    //       if (!resp.result || resp.result !== 'fail') {
    //         this._searchTerm = {
    //           giatien_min: model.giatien[0],
    //           giatiem_max: model.giatien[1],
    //           truong: model.truong,
    //           nganh: model.nganh,
    //           gioitinh: model.gioitinh
    //         }
    //         this._listTKPT = resp;
    //         resolve('success');
    //       } else {
    //         this.handleError('timkiemPhongtro', resp.result);
    //         reject(resp.result);
    //       }
    //     },
    //     error => this.handleError('timkiemPhongtro', error));
    // });
  }
}
