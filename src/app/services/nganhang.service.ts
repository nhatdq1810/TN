import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Nganhang } from '../models/nganhang';
import { Observable } from 'rxjs/Observable';

let Constants = require('../resources/constants');

@Injectable()
export class NganhangService {

  constructor(private http: Http) { }

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
      this.http.post(Constants.apiUrl + 'nganhang/login', JSON.stringify(data), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          resolve(resp);
        },
        err => this.handleError('login', err));
    })
  }

}
