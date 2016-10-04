import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { User } from './user';
let Constants = require('./Constants');

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
      .then(resp => (console.log(resp)))
      .catch(this.handleError);
  }

}
