import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';

let Constants = require('../resources/constants');

@Injectable()
export class UserService {

  private loggedIn = false;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('isLoggedIn');
  }

  private handleError(funcName: string, error: any): Observable<any> {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }

  login(username, password) {
    let data = {
      username: username,
      password: password
    };
    return new Promise(resolve => {
      this.http.post(Constants.apiUrl + 'user/login', JSON.stringify(data), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.loggedIn = true;
          localStorage.setItem('isLoggedIn', 'true');
          resolve(resp.data);
        },
        err => this.handleError('login', err));
    })
  }

  logout(){
    localStorage.removeItem('isLoggedIn');
    this.loggedIn = false;
  }

  isLoggedIn(){
    return this.loggedIn;
  }

  layThongtinUser(username: string): Promise<User>{
    return new Promise(resolve => {
      this.http.get(Constants.apiUrl + 'user/' + username, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(user => {
          resolve(user);
        },
        err => this.handleError('layThongtinUser', err));
    })
  }

}
