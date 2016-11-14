import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../services/user.service';
import { NganhangService } from '../../services/nganhang.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ModalDirective, ModalOptions } from 'ng2-bootstrap/ng2-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginModal') loginModal: ModalDirective;
  private modalOptions: ModalOptions;
  private loginForm: string;
  private typeTiencoc: number;
  private complexForm: FormGroup;
  private isLoggedIn: boolean;
  private alertLoggedIn: Array<Object>;
  private hasUsernameForgot: boolean;
  private alertUsernameForgot: Array<Object>;
  private isForgot: boolean;
  private successForgotPasswordMsg: string;

  constructor(private userService: UserService, private nghService: NganhangService, private authService: AuthService, private router: Router, private fb: FormBuilder, private http: Http) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.successForgotPasswordMsg = '';
    this.hasUsernameForgot = false;
    this.isLoggedIn = true;
    this.isForgot = false;
    this.modalOptions = {
      ignoreBackdropClick: true
    };
    this.complexForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'usernameForgot': ''
    });
    this.alertLoggedIn = [{
      msg: 'Tài khoản hoặc mật khẩu không đúng !'
    }];
    this.alertUsernameForgot = [{
      msg: 'Tài khoản hoặc Email không đúng !'
    }];
  }

  closeAlert(typeMsg) {
    if(typeMsg === 'forgot') {
      this.alertUsernameForgot.splice(0, 1);
    } else {
      this.alertLoggedIn.splice(0, 1);
    }
  }

  socialLogin(socialName) {
    if(socialName === 'facebook'){
      this.authService.facebookLogin();
    } else {
      this.authService.googleLogin();
    }
  }

  forgotPassword(value: any) {
    value.username = value.usernameForgot;
    delete value.usernameForgot;
    delete value.password;
    this.userService.phuchoiPassword(value)
    .then((result: string) => {
      this.successForgotPasswordMsg = result;
      setTimeout(() => {
        this.loginModal.hide();
      }, 3000);
    })
    .catch(err => {
      console.error(err);
      this.successForgotPasswordMsg = '';
      this.hasUsernameForgot = true;
      this.alertUsernameForgot = [{
        msg: 'Tài khoản hoặc Email không đúng !'
      }];
    })
  }

  submitForm(value: any) {
    delete value.usernameForgot;
    if(this.loginForm !== 'nganhang') {
      this.userService.login(value.username, value.password)
        .then(resp => {
          if (resp) {
            this.closeModal();
          } else {
            this.isLoggedIn = false;
            this.alertLoggedIn = [{
              msg: 'Tài khoản hoặc mật khẩu không đúng!'
            }];
          }
        })
        .catch(reason => {
          this.isLoggedIn = false;
          this.alertLoggedIn = [{
            msg: 'Tài khoản hoặc mật khẩu không đúng!'
          }];
        });
    } else {
      this.nghService.login(value.username, value.password)
        .then(resp => {
          if (resp) {
            this.closeModal();
            this.router.navigate(['/transfer', { typeTiencoc : this.typeTiencoc}]);
          } else {
            this.isLoggedIn = false;
          }
        })
        .catch(reason => {
          this.isLoggedIn = false;
        });
    }
  }

  closeModal() {
    this.loginModal.hide();
  }

  showModal(loginForm: string, typeTiencoc: number) {
    this.loginForm = loginForm;
    if(this.loginForm === 'nganhang') {
      this.typeTiencoc = typeTiencoc;
    }
    this.init();
    this.loginModal.show();
  }

}
