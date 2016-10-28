import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NganhangService } from '../../services/nganhang.service';
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
  private isLoggedIn = true;
  private alertLoggedIn: Array<Object>;

  constructor(private userService: UserService, private nghService: NganhangService, private router: Router, private fb: FormBuilder) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.modalOptions = {
      ignoreBackdropClick: true
    };
    this.complexForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.alertLoggedIn = [{
      msg: 'Tài khoản hoặc mật khẩu không đúng!'
    }];
  }

  closeAlert() {
    this.alertLoggedIn.splice(0, 1);
  }

  submitForm(value: any) {
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
