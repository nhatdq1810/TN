import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ModalDirective, ModalOptions } from 'ng2-bootstrap/ng2-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

let Constants = require('../../resources/constants');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerModal') registerModal: ModalDirective;
  private modalOptions: ModalOptions;
  private complexForm: FormGroup;
  private errorMsg: Array<Object>;
  private canRegister = true;
  private registerSuccess = false;
  private errorPattern: boolean;

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.errorPattern = false;
    this.modalOptions = {
      ignoreBackdropClick: true
    };
    this.complexForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'hoten': ['', Validators.required],
      'email': ['', Validators.required]
    });
    this.errorMsg = [{
      msg: ''
    }];
  }

  socialLogin(socialName) {
    if (socialName === 'facebook') {
      this.authService.facebookLogin();
    } else {
      this.authService.googleLogin();
    }
  }

  submitForm(value: any) {
    let user: any = {
      username: value.username,
      password: value.password,
      hoten: value.hoten,
      email: value.email,
      ngayDK: Constants.getCurrentDate()
    }
    if (Constants.patternPassword.test(value.password)) {
      this.errorPattern = false;
      this.userService.themUser(user)
      .then(resp => {
        if (resp) {
          this.registerSuccess = true;
          setTimeout(() => {
            this.closeModal();
          }, 3000);
        }
      })
      .catch(result => {
        this.canRegister = false;
        this.errorMsg = [{
          msg: result
        }];
      });
    } else {
      this.errorPattern = true;
    }
  }

  closeAlert() {
    this.errorMsg.splice(0, 1);
  }

  closeModal() {
    this.registerModal.hide();
  }

  showModal() {
    this.init();
    this.registerModal.show();
  }

}
