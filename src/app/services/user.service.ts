import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';

let Constants = require('../resources/constants');

@Injectable()
export class UserService {

  public checkLoggedIn = new Subject();
  private loggedIn = false;
  private _user: User;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('isLoggedIn');
  }

  private handleError(funcName: string, error: any): Observable<any> {
    console.error(funcName + ' has error ', error);
    return Observable.throw(error.message || error);
  }

  get user(): User {
    return this._user;
  }

  login(username, password) {
    let data = {
      username: username,
      password: password
    };
    return new Promise((resolve, reject) => {
      this.http.post(Constants.apiUrl + 'user/login', JSON.stringify(data), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          if (!resp.result || resp.result !== 'fail') {
            this.loggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            this._user = resp;
            this.checkLoggedIn.next(true);
            resolve(resp);
          } else {
            this.handleError('login', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('login', err));
    })
  }

  logout(){
    localStorage.removeItem('isLoggedIn');
    this.loggedIn = false;
    this.checkLoggedIn.next(false);
  }

  isLoggedIn(){
    return this.loggedIn;
  }

  layThongtinUser(username: string): Promise<User>{
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + 'user/' + username, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
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
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + 'user/id/' + id, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
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

  themUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.apiUrl + 'user/moi', JSON.stringify(user), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          if (!resp.result) {
            this.loggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            this._user = resp;
            this.checkLoggedIn.next(true);
            resolve(resp);
          } else {
            this.handleError('themUser', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('themUser', err));
    })
  }

}
