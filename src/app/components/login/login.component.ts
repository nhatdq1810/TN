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
  private complexForm: FormGroup;
  private isLoggedIn: boolean = true;
  private alertLoggedIn: Array<Object>;
  private hasUsernameForgot: boolean = false;
  private alertUsernameForgot: Array<Object>;
  private isForgot: boolean;

  constructor(private userService: UserService, private nghService: NganhangService, private authService: AuthService, private router: Router, private fb: FormBuilder, private http: Http) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
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
      msg: 'Tài khoản hoặc email không đúng !'
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
    console.log(value);
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
            this.router.navigate(['/transfer']);
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

  showModal(loginForm: string) {
    this.loginForm = loginForm;
    this.init();
    this.loginModal.show();
  }

}
