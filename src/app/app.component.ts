import { Component, ViewContainerRef } from '@angular/core';
import { Router, Params } from '@angular/router';
import { UserService } from './services/user.service';

let Constants = require('./resources/constants');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private viewContainerRef: ViewContainerRef;
  private admin: boolean;

  public constructor(private router: Router, viewContainerRef: ViewContainerRef, private userService: UserService) {
    this.viewContainerRef = viewContainerRef;
    this.router.events.subscribe(event => {
      if (event.url.indexOf('admin') > -1) {
        this.admin = true;
      } else {
        this.admin = false;
        this.checkLocalStorage();
      }
    });
  }

  private checkLocalStorage() {
    let tmpUser = decodeURIComponent(localStorage.getItem('user'));
    if (localStorage.length > 0) {
      let currentDate = new Date();
      let currentTime = currentDate.getTime();
      let expTime = +localStorage.getItem('exp');
      if (expTime > currentTime) {
        let usr: any = {};
        this.userService.loggedIn = true;
        this.userService.user = JSON.parse(tmpUser);
        this.userService.checkLoggedIn.next(true);
      } else {
        localStorage.clear();
      }
    }
  }
}
