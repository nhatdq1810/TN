import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    let password: boolean;
    this.route.params.forEach((params: Params) => {
      password = params['password'];
    })
    console.log(password);
  }

}
