import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { User } from '../models/user';
let Constants = require('../resources/constants');

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  layThongtinUser(username: string): Promise<User>{
    return this.http.get(Constants.apiUrl + 'user/' + username, {headers: Constants.headers})
      .toPromise()
      .then(function (resp) {
        for (var key in resp) {
          console.log(key);
          console.log(resp[key]);
        }
      })
      .catch(this.handleError);
  }

}
