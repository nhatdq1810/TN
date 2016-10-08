import { Injectable } from '@angular/core';
import { Phongtro } from '../models/phongtro';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

let Constants = require('../resources/constants');

@Injectable()
export class PhongtroService {

  constructor(private http: Http) { }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }

  getListPhongtro(): Observable<Phongtro[]>{
    return this.http.get(Constants.apiUrl + 'phongtro/tatca', {headers: Constants.headers})
      .map((resp: Response) => resp.json())
      .catch(this.handleError);
  }

}
