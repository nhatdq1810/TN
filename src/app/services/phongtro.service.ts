import { Injectable, EventEmitter } from '@angular/core';
import { Phongtro } from '../models/phongtro';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


let Constants = require('../resources/constants');

@Injectable()
export class PhongtroService {

  private _listPT: any[] = [];
  private _currentPT: any;
  private _searchTerm: any;

  constructor(private http: Http, private router: Router) {
  }

  get listPT(): any[]{
    return this._listPT;
  }

  get currentPT(): any{
    return this._currentPT;
  }

  get searchTerm(): any {
    return this._searchTerm;
  }

  set searchTerm(term) {
    this._searchTerm = term;
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

  layPhongtroUser(userID: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(Constants.apiUrl + 'phongtro/user/' + userID, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('layPhongtroUser', resp.result);
            reject(resp.result);
          }
        },
        error => this.handleError('layPhongtroUser', error));
    });
  }

  layPhongtroHot(gioihan: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(Constants.apiUrl + 'phongtro/hot?gioihan=' + gioihan, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          if (!resp.result || resp.result !== 'fail') {
            this._listPT = resp;
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
            this._listPT = resp;
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
    // this._searchTerm = model;
    // return new Promise((resolve, reject) => {
    //   resolve('success');
    // });
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `phongtro/timkiem?giatien_min=${model.giatien_min}&giatien_max=${model.giatien_max}&tiencoc_min=${model.tiencoc_min}&tiencoc_max=${model.tiencoc_max}&dientich_min=${model.dientich_min}&dientich_max=${model.dientich_max}&truong=${model.truong}&nganh=${model.nganh}&khoa=${model.khoa}&gioitinh=${model.gioitinh}&wifi=${model.wifi}&chu=${model.chu}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          if (!resp.result || resp.result !== 'fail') {
            this._searchTerm = model;
            this._listPT = resp;
            resolve('success');
          } else {
            this.handleError('timkiemPhongtro', resp.result);
            reject(resp.result);
          }
        },
        error => this.handleError('timkiemPhongtro', error));
    });
  }

  themPhongtro(model): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.apiUrl + 'phongtro/moi', JSON.stringify(model), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('themPhongtro', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('themPhongtro', err));
    });
  }

  xoaPhongtro(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(Constants.apiUrl + 'phongtro/' + id, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('xoaPhongtro', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('xoaPhongtro', err));
    });
  }

}
