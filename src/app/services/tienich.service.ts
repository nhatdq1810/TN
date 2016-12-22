import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

let Constants = require('../resources/constants');

@Injectable()
export class TienichService {

  constructor(private slimLoader: SlimLoadingBarService, private http: Http, private router: Router) {
  }

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

  layTatcaTienich(): Promise<any> {
    this.startLoading();
    return new Promise((resolve, reject) => {
      this.http
        .get(Constants.apiUrl + 'tienich/tatca', { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          this.completeLoading();
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('layTatcaTienich', resp.result);
            reject(resp.result);
          }
        },
        error => this.handleError('layTatcaTienich', error));
    });
  }

}
