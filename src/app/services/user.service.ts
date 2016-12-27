import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

let Constants = require('../resources/constants');

@Injectable()
export class UserService {

  public checkLoggedIn = new Subject();
  public checkAdminLoggedIn = new Subject();
  private _loggedIn: boolean = false;
  private _user: any;

  constructor(private slimLoader: SlimLoadingBarService, private http: Http, private router: Router) {
  }

  private handleError(funcName: string, error: any): Observable<any> {
    this.completeLoading();
    console.error(funcName + ' has error ', error);
    return Observable.throw(error.message || error);
  }

  get user(): any {
    return this._user;
  }

  set user(user: any) {
    this._user = user;
  }

  set loggedIn(isLoggedIn: boolean) {
    this._loggedIn = isLoggedIn;
  }

  startLoading() {
    this.slimLoader.start(() => {
      console.log('Loading complete');
    });
  }

  completeLoading() {
    this.slimLoader.complete();
  }

  setLocalStorage(resp) {
    localStorage.clear();
    let user = encodeURIComponent(JSON.stringify(resp));
    localStorage.setItem('user', user);
    let timeExp = Constants.getDateExp();
    localStorage.setItem('exp', timeExp);
  }

  login(username, password, loai) {
    let data = {
      username: username,
      password: password
    };
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.post(Constants.apiUrl + `user/login/${loai}`, JSON.stringify(data), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            if(loai === 'user') {
              this.setLocalStorage(resp);
              this._loggedIn = true;
              this._user = resp;
              this.checkLoggedIn.next(true);
            } else {
              this.checkAdminLoggedIn.next(true);
            }
            resolve(resp);
          } else {
            this.handleError('login', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('login', err));
    })
  }

  logout(role: string){
    if(role && role === 'admin') {
      this.checkAdminLoggedIn.next(false);
    } else {
      if (this._user.email.indexOf('gg-') > -1 || this._user.email.indexOf('fb-') > -1) {
        let homepage = encodeURIComponent('http://localhost:4200/home');
        window.location.href = `https://nhatdq1810.auth0.com/v2/logout?returnTo=${homepage}`;
      }
      this._user = undefined;
      localStorage.clear();
      this.checkLoggedIn.next(false);
      this._loggedIn = false;
    }
  }

  isLoggedIn(){
    return this._loggedIn;
  }

  layTatcaUser(): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + 'user/tatca', { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('layTatcaUser', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('layTatcaUser', err));
    })
  }

  layThongtinUser(username: string): Promise<User> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + 'user/' + username, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('layThongtinUser', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('layThongtinUser', err));
    })
  }

  layThongtinUserID(id: number): Promise<User> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + 'user/id/' + id, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('layThongtinUserID', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('layThongtinUserID', err));
    })
  }

  themUser(user): Promise<User> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.post(Constants.apiUrl + 'user/moi', JSON.stringify(user), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result) {
            this.setLocalStorage(resp);
            this._loggedIn = true;
            this._user = resp;
            this.checkLoggedIn.next(true);
            resolve(resp);
          } else {
            this.handleError('themUser', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('themUser', err));
    });
  }

  capnhatUser(user): Promise<User> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.put(Constants.apiUrl + 'user/' + user.username, JSON.stringify(user), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result) {
            this.setLocalStorage(resp);
            this._user = resp;
            resolve(resp);
          } else {
            this.handleError('capnhatUser', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('capnhatUser', err));
    });
  }

  xoaUser(listUser, listReason): Promise<any> {
    let listInfo = {
      listUser: listUser,
      listReason: listReason
    }
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.post(Constants.apiUrl + `user/xoa`, JSON.stringify(listInfo),{ headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (resp.result && resp.result === 'success') {
            resolve(resp.result);
          } else {
            this.handleError('xoaUser', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('xoaUser', err));
    });
  }

  capnhatPassword(user): Promise<User> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.put(Constants.apiUrl + 'user/' + user.username + '/password', JSON.stringify(user), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result) {
            this.setLocalStorage(resp);
            this._user = resp;
            resolve(resp);
          } else {
            this.handleError('capnhatPassword', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('capnhatPassword', err));
    });
  }

  phuchoiPassword(user): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.post(Constants.apiUrl + 'user/' + user.username + '/password', JSON.stringify(user), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (resp.result !== 'fail') {
            resolve(resp.result);
          } else {
            this.handleError('phuchoiPassword', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('phuchoiPassword', err));
    });
  }

  thongkeUserTheoThang(thangBD, thangKT): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + 'user/thongkeUserTheoThang/' + thangBD + '/' + thangKT, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkeUserTheoThang', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkeUserTheoThang', err));
    });
  }

  thongkeUserMoiTrenTongso(thang): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
          this.http.get(Constants.apiUrl + 'user/thongkeUserMoiTrenTongso/thang/' + thang, { headers: Constants.headers })
            .map((resp: Response) => resp.json())
            .subscribe(resp => {
              this.completeLoading();
              if (!resp.result || resp.result !== 'fail') {
                resolve(resp);
              } else {
                this.handleError('thongkeUserMoiTrenTongso', resp.result);
                reject(resp.result);
              }
        },
        err => this.handleError('thongkeUserMoiTrenTongso', err));
    });
  }

  thongkeUserComment(thang, gioihan): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `user/thongkeUserComment/thang/${thang}?gioihan=${gioihan}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkeUserComment', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkeUserComment', err));
    });
  }

  thongkeUserKieuLogin(thang): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `user/thongkeUserKieuLogin/thang/${thang}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkeUserKieuLogin', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkeUserKieuLogin', err));
    });
  }

  thongkeUserTaoPT(thang, gioihan): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `user/thongkeUserTaoPT/thang/${thang}?gioihan=${gioihan}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkeUserTaoPT', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkeUserTaoPT', err));
    });
  }

  thongkeUserTheoDTC(thang, gioihan): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + `user/thongkeUserTheoDTC/thang/${thang}?gioihan=${gioihan}`, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('thongkeUserTheoDTC', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('thongkeUserTheoDTC', err));
    });
  }

}
