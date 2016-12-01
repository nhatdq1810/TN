import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PhongtroService } from '../../services/phongtro.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private isLoggedIn: boolean = false;
  private user: any;

  constructor(private userService: UserService, private ptService: PhongtroService) {
    this.fakeInit();
    // this.init();
  }

  ngOnInit() {
  }

  init() {
    this.userService.checkLoggedIn.subscribe((value: boolean) => this.isLoggedIn = value);
    this.user = this.userService.user;
  }

  searchFull() {
    this.ptService.searchTerm = undefined;
    this.ptService.listPT = [];
  }

  logout() {
    this.userService.logout();
  }

  createPTActiveLink() {
    if(window.location.href.indexOf('formInfo=create') > -1) {
      return true;
    } else {
      return false;
    }
  }

  fakeInit() {
    this.isLoggedIn = true;
    this.user = {
      id: 1
    };
  }

}
