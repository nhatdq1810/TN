import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  private complexForm: FormGroup;
  private user: User;
  private formInfo: string;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private userService: UserService, private location: Location) {
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

  goback() {
    this.location.back();
  }

  fakeInit() {
    this.route.params.forEach((params: Params) => {
      this.formInfo = params['formInfo'];
    });
    this.user = {
      diachi: '',
      dotincay: 0,
      email: 'abc@a.com',
      facebook: '',
      hoten: 'abc',
      id: 1,
      password: '123456',
      skype: '',
      sodt: '',
      username: 'abc'
    };
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
