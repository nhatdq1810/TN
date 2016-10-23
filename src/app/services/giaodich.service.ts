import { Injectable } from '@angular/core';
import { Giaodich } from '../models/giaodich';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

let Constants = require('../resources/constants');

@Injectable()
export class GiaodichService {

  constructor(private http: Http, private router: Router) { }

  private handleError(funcName: string, error: any): Observable<any> {
    console.error(funcName + ' has error ', error);
    // this.router.navigate(['/404']);
    return Observable.throw(error.message || error);
  }

  chuyenTien(phongtroID, model) {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.apiUrl + `giaodich/phongtro/${phongtroID}/chuyenTien`, JSON.stringify(model), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('chuyenTien', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('chuyenTien', err));
    })
  }
}
