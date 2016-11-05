import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { UserService } from './user.service';
import { User } from '../models/user';


let Constants = require('../resources/constants');
declare let Auth0: any;

@Injectable()
export class AuthService {

  private auth0 = new Auth0({
    domain: Constants.authConfig.domain,
    clientID: Constants.authConfig.clientID,
    responseType: 'token',
    callbackURL: 'http://localhost:4200/home',
  });

  constructor(private userService: UserService) {
    let result = this.auth0.parseHash(window.location.hash);

    if (result && result.idToken) {
      localStorage.setItem('id_token', result.idToken);
      localStorage.setItem('isLoggedIn', 'true');
      this.userService.checkLoggedIn.next(true);
      this.auth0.getProfile(result.idToken, (err, profile) => {
        let username, hoten, email, facebook;
        if (profile.identities[0].connection === 'facebook') {
          username = 'f-' + profile.nickname;
          email = 'f-' + profile.email;
          facebook = profile.link;
        } else {
          username = 'g-' + profile.nickname;
          email = 'g-' + profile.email;
          facebook = '';
        }
        if(profile.middle_name) {
          hoten = profile.family_name + ' ' + profile.middle_name + ' ' + profile.given_name;
        } else {
          hoten = profile.family_name + ' ' + profile.given_name;
        }
        let user = {
          hoten: hoten,
          email: email,
          username: username,
          password: profile.clientID,
          facebook: facebook
        };
        this.userService.login(user.username, user.password).then(user => {
          this.userService.user = user;
          localStorage.setItem('id_token', result.idToken);
          localStorage.setItem('isLoggedIn', 'true');
          this.userService.checkLoggedIn.next(true);
        })
        .catch(err => {
          if(err === 'fail') {
            this.userService.themUser(user).then(user => {
              this.userService.user = user;
              localStorage.setItem('id_token', result.idToken);
              localStorage.setItem('isLoggedIn', 'true');
              this.userService.checkLoggedIn.next(true);
            });
          }
        });
      });
    } else if (result && result.error) {
      alert('error: ' + result.error);
    }
  }

  public googleLogin() {
    this.auth0.login({
      connection: 'google-oauth2'
    }, (err) => {
      if (err) {
        alert("something went wrong: " + err.message);
      }
    });
  };

  public facebookLogin() {
    this.auth0.login({
      connection: 'facebook'
    }, (err) => {
      if (err) {
        alert("something went wrong: " + err.message);
      }
    });
  };

  authenticated() {
    return tokenNotExpired();
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('isLoggedIn');
    this.userService.checkLoggedIn.next(false);
  }

}
