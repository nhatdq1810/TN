import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

let Constants = require('../../resources/constants');

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  private complexForm: FormGroup;
  private user: User;
  private formInfo: string;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private userService: UserService) {
    // this.fakeInit();
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.route.params.forEach((params: Params) => {
      this.formInfo = params['formInfo'];
    });
    this.user = this.userService.user;
    this.complexForm = this.fb.group({
      'password': ['', Validators.required],
      'hoten': [this.user.hoten, Validators.required],
      'email': [this.user.email, Validators.required],
      'diachi': this.user.diachi,
      'sodt': this.user.sodt,
      'facebook': this.user.facebook,
      'skype': this.user.skype,
      'oldPassword': ['', Validators.required],
      'rePassword': ''
    });
  }

  submitForm(value: any) {
    console.log(value);
  }

  fakeInit() {
    this.route.params.forEach((params: Params) => {
      this.formInfo = params['formInfo'];
    });
    this.user = Constants.fakeUser;
    this.complexForm = this.fb.group({
      'password': ['', Validators.required],
      'hoten': [this.user.hoten, Validators.required],
      'email': [this.user.email, Validators.required],
      'diachi': this.user.diachi,
      'sodt': this.user.sodt,
      'facebook': this.user.facebook,
      'skype': this.user.skype,
      'oldPassword': ['', Validators.required],
      'rePassword': ''
    });
  }

}
