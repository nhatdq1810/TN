import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private isLoggedIn: boolean = false;
  private user: any;

  constructor(private userService: UserService) {
    // this.fakeInit();
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.userService.checkLoggedIn.subscribe((value: boolean) => this.isLoggedIn = value);
    this.user = this.userService.user;
  }

  logout() {
    this.userService.logout();
  }

  fakeInit() {
    this.isLoggedIn = true;
    this.user = {
      id: 1
    };
  }

}
