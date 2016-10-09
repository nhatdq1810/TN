import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';

let Constants = require('../resources/constants');

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }

  layThongtinUser(username: string): Observable<User>{
    return this.http.get(Constants.apiUrl + 'user/' + username, { headers: Constants.headers })
      .map((resp: Response) => resp.json());
  }

}
