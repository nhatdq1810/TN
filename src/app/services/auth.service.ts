import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

declare let Auth0Lock: any;

@Injectable()
export class AuthService {

  private lock = new Auth0Lock('W86crS2GtE2H6uTKOSsiEemJpLuutnVB', 'nhatdq1810.auth0.com', {});

  constructor() {
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
    })
  }

  login() {
    this.lock.show();
  }

  authenticated() {
    return tokenNotExpired();
  }

  logout() {
    localStorage.removeItem('id_token');
  }

}
