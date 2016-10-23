import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private isLoggedIn: boolean = false;

  constructor(private userService: UserService) {
    this.userService.checkLoggedIn.subscribe((value: boolean) => this.isLoggedIn = value);
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

}
