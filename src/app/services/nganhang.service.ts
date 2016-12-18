import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Nganhang } from '../models/nganhang';
import { Observable } from 'rxjs/Observable';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

let Constants = require('../resources/constants');

@Injectable()
export class NganhangService {

  private _currentNgh: Nganhang;

  constructor(private slimLoader: SlimLoadingBarService, private http: Http) { }

  get currentNgh(): Nganhang {
    return this._currentNgh;
  }

  startLoading() {
    this.slimLoader.start(() => {
      console.log('Loading complete');
    });
  }

  completeLoading() {
    this.slimLoader.complete();
  }

  private handleError(funcName: string, error: any): Observable<any> {
    this.completeLoading();
    console.error(funcName + ' has error ', error);
    return Observable.throw(error.message || error);
  }

  login(username, password) {
    let data = {
      username: username,
      password: password
    };
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.post(Constants.apiUrl + 'nganhang/login', JSON.stringify(data), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            this._currentNgh = resp;
            resolve(resp);
          } else {
            this.handleError('login', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('login', err));
    });
  }

  layThongtinNganhangTheoId(id) {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + 'nganhang/id/' + id, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('layThongtinNganhangTheoId', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('layThongtinNganhangTheoId', err));
    });
  }

  thongkeGDGui(thang, gioihan):Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `giaodich/thongkeGDGui/thang/${thang}?gioihan=${gioihan}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkeGDGui', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkeGDGui', err));
    });
  }

  thongkeGDNhan(thang, gioihan):Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `giaodich/thongkeGDNhan/thang/${thang}?gioihan=${gioihan}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkeGDNhan', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkeGDNhan', err));
    });
  }

  thongkeGDTheoPT(thang, gioihan):Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `giaodich/thongkeGDTheoPT/thang/${thang}?gioihan=${gioihan}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkeGDTheoPT', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkeGDTheoPT', err));
    });
  }

  thongkeGDTheoLoaiGD(thangBD, thangKT): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `giaodich/thongkeGDTheoLoaiGD/${thangBD}/${thangKT}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkeGDTheoLoaiGD', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkeGDTheoLoaiGD', err));
    });
  }

  thongkeGDTheoLoaiGDMoiThang(thang): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `giaodich/thongkeGDTheoLoaiGDMoiThang/thang/${thang}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkeGDTheoLoaiGDMoiThang', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkeGDTheoLoaiGDMoiThang', err));
    });
  }

}
