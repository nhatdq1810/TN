import { Injectable, EventEmitter } from '@angular/core';
import { Phongtro } from '../models/phongtro';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';


let Constants = require('../resources/constants');

@Injectable()
export class PhongtroService {

  private _listPT: any[] = [];
  private _currentPT: any;
  private _searchTerm: any;
  private _listTruong: any[] = [];
  private _listNganh: any[] = [];
  private _listKhoa: any[] = [];
  public phongtroDetailChange = new Subject();

  constructor(private slimLoader: SlimLoadingBarService, private http: Http, private router: Router) {
  }

  get listPT(): any[]{
    return this._listPT;
  }

  set listPT(listPT) {
    this._listPT = listPT;
  }

  get listTruong(): any[] {
    return this._listTruong;
  }

  get listNganh(): any[] {
    return this._listNganh;
  }

  get listKhoa(): any[] {
    return this._listKhoa;
  }

  get currentPT(): any{
    return this._currentPT;
  }

  set currentPT(pt) {
    this._currentPT = pt;
  }

  get searchTerm(): any {
    return this._searchTerm;
  }

  set searchTerm(term) {
    this._searchTerm = term;
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

  layTatcaPhongtro(duyet): Promise<any>{
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http
        .get(Constants.apiUrl + 'phongtro/tatca/' + duyet, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
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
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http
        .get(Constants.apiUrl + 'phongtro/' + id, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result) {
            this._currentPT = resp;
            this.phongtroDetailChange.next(true);
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
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http
        .get(Constants.apiUrl + 'phongtro/user/' + userID, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
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
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http
        .get(Constants.apiUrl + 'phongtro/hot?gioihan=' + gioihan, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
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
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http
        .get(Constants.apiUrl + 'phongtro/moi?gioihan=' + gioihan, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
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

  layDulieuTimkiemPhongtro(): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `phongtro/dulieu/timkiem`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            for (let i = 0; i < resp.length; i++) {
              let pt = resp[i];
              if (pt.truong !== '' && this.listTruong.indexOf(pt.truong) < 0) {
                this.listTruong.push(pt.truong);
              }
              if (pt.nganh !== '' && this.listNganh.indexOf(pt.nganh) < 0) {
                this.listNganh.push(pt.nganh);
              }
              if (pt.khoa !== '' && this.listKhoa.indexOf(pt.khoa) < 0) {
                this.listKhoa.push(pt.khoa);
              }
            }
            resolve('success');
          } else {
            this.handleError('layDulieuTimkiemPhongtro', resp.result);
            reject(resp.result);
          }
        },
        error => this.handleError('layDulieuTimkiemPhongtro', error));
    });
  }

  timkiemPhongtro(model, gioihan): Promise<any>{
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `phongtro/timkiem?loaiPhong=${model.loaiPhong}&giatien_min=${model.giatien_min}&giatien_max=${model.giatien_max}&giatienTheoNguoi_min=${model.giatienTheoNguoi_min}&giatienTheoNguoi_max=${model.giatienTheoNguoi_max}&dientich_min=${model.dientich_min}&dientich_max=${model.dientich_max}&truong=${model.truong}&nganh=${model.nganh}&khoa=${model.khoa}&gioitinh=${model.gioitinh}&gioihan=${gioihan}&diachi=${model.diachi}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
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
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.post(Constants.apiUrl + 'phongtro/moi', JSON.stringify(model), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
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

  capnhatPhongtro(id, model): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.put(Constants.apiUrl + 'phongtro/' + id, JSON.stringify(model), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('capnhatPhongtro', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('capnhatPhongtro', err));
    });
  }

  xoaPhongtro(userID, id: number): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.delete(Constants.apiUrl + 'phongtro/' + id + '/user/' + userID, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
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

  thichPhongtro(id, userID): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.put(Constants.apiUrl + 'phongtro/' + id + '/like/user/' + userID, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (resp.result !== 'fail') {
            resolve(resp.result);
          } else {
            this.handleError('thichPhongtro', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thichPhongtro', err));
    });
  }

  boThichPhongtro(id, userID): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.delete(Constants.apiUrl + 'phongtro/' + id + '/like/user/' + userID, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (resp.result !== 'fail') {
            resolve(resp.result);
          } else {
            this.handleError('boThichPhongtro', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('boThichPhongtro', err));
    });
  }

  layLuotThichPhongtro(id): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http
        .get(Constants.apiUrl + 'phongtro/' + id + '/like', { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('layLuotThichPhongtro', resp.result);
            reject(resp.result);
          }
        },
        error => this.handleError('layLuotThichPhongtro', error));
    });
  }

  kiemtraUserThichPhongtro(id, userID): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + 'phongtro/' + id + '/like/user/' + userID, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (resp.result !== 'fail') {
            resolve(resp.result);
          } else {
            this.handleError('kiemtraUserThichPhongtro', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('kiemtraUserThichPhongtro', err));
    });
  }

  thongkePTTheoThang(thangBD, thangKT): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + 'phongtro/thongkePTTheoThang/' + thangBD + '/' + thangKT, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkePTTheoThang', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkePTTheoThang', err));
    });
  }

  thongkePTMoiTrenTongso(thang): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + 'phongtro/thongkePTMoiTrenTongso/thang/' + thang, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkePTMoiTrenTongso', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkePTMoiTrenTongso', err));
    });
  }

  thongkePTTheoDiachi(loai, thang, gioihan): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `phongtro/thongkePTTheoDiachi/${loai}/thang/${thang}?gioihan=${gioihan}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkePTTheoDiachi', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkePTTheoDiachi', err));
    });
  }

  thongkePTTheoInput(column, thang, gioihan): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `phongtro/thongkePTTheoInput/${column}/thang/${thang}?gioihan=${gioihan}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkePTTheoInput', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkePTTheoInput', err));
    });
  }

  thongkePTTheoTienVaDientich(column, thang, gioihan): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `phongtro/thongkePTTheoTienVaDientich/${column}/thang/${thang}?gioihan=${gioihan}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkePTTheoTienVaDientich', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkePTTheoTienVaDientich', err));
    });
  }

  adminXoaPhongtro(listPT, listReason): Promise<any> {
    let listInfo = {
      listPT: listPT,
      listReason: listReason
    };
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.post(Constants.apiUrl + `phongtro/admin/xoa`, JSON.stringify(listInfo), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (resp.result !== 'fail') {
            resolve(resp.result);
          } else {
            this.handleError('adminXoaPhongtro', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('adminXoaPhongtro', err));
    });
  }

  xetduyetPT(listPT, listReason, duyet): Promise<any> {
    let listInfo = {
      listPT: listPT,
      listReason: listReason
    };
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.put(Constants.apiUrl + `phongtro/duyet/${duyet}`, JSON.stringify(listInfo), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('xetduyetPT', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('xetduyetPT', err));
    });
  }

  anPT(id, an) {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.put(Constants.apiUrl + `phongtro/${id}/an/${an}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('anPT', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('anPT', err));
    });
  }

  thongkePTTheoLike(thang, gioihan): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `phongtro/thongkePTTheoLike/thang/${thang}?gioihan=${gioihan}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkePTTheoLike', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkePTTheoLike', err));
    });
  }

  thongkePTTheoComment(thang, gioihan): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `phongtro/thongkePTTheoComment/thang/${thang}?gioihan=${gioihan}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkePTTheoComment', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkePTTheoComment', err));
    });
  }

}
