import { Injectable } from '@angular/core';
import { Giaodich } from '../models/giaodich';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

let Constants = require('../resources/constants');

@Injectable()
export class GiaodichService {

  constructor(private slimLoader: SlimLoadingBarService, private http: Http, private router: Router) { }

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

  chuyenTien(model) {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.post(Constants.apiUrl + `giaodich/phongtro/chuyenTien`, JSON.stringify(model), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
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
