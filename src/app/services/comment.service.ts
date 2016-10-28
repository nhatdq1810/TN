import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

let Constants = require('../resources/constants');

@Injectable()
export class CommentService {

  constructor(private http: Http) { }

  private handleError(funcName: string, error: any): Observable<any> {
    console.error(funcName + ' has error ', error);
    return Observable.throw(error.message || error);
  }

  layCommentPhongtro(phongtroID: number) {
    return new Promise((resolve, reject) => {
      this.http.get(Constants.apiUrl + 'comment/phongtro/' + phongtroID, { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('layCommentPhongtro', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('layCommentPhongtro', err));
    });
  }

  themComment(model) {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.apiUrl + 'comment/moi', JSON.stringify(model), { headers: Constants.headers })
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          if (!resp.result || resp.result !== 'fail') {
            resolve(resp);
          } else {
            this.handleError('themComment', resp.result);
            reject(resp.result);
          }
        },
        err => this.handleError('themComment', err));
    });
  }

}
