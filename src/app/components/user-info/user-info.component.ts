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
  private prefixEmail: string;
  private formInfo: string;
  private hasError: boolean;
  private editSuccess: boolean;
  private errorPattern: boolean;
  private errorMsg: Array<Object>;
  private successMsg: Array<Object>;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private userService: UserService) {
    // this.fakeInit();
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.errorPattern = false;
    this.hasError = false;
    this.errorMsg = [{
      msg: ''
    }];
    this.editSuccess = false;
    this.successMsg = [{
      msg: ''
    }];
    this.route.params.forEach((params: Params) => {
      this.formInfo = params['formInfo'];
    });
    this.user = this.userService.user;
    let email;
    let tmpEmail = this.user.email.split('f-');
    if (tmpEmail.length === 1) {
      tmpEmail = this.user.email.split('g-');
      if (tmpEmail.length === 1) {
        this.prefixEmail = '';
        email = this.user.email;
      } else {
        this.prefixEmail = 'g-';
        email = tmpEmail[1];
      }
    } else {
      this.prefixEmail = 'f-';
      email = tmpEmail[1];
    }

    this.complexForm = this.fb.group({
      'password': ['', Validators.required],
      'hoten': [this.user.hoten, Validators.required],
      'email': [email, Validators.required],
      'diachi': this.user.diachi,
      'sodt': this.user.sodt,
      'facebook': this.user.facebook,
      'skype': this.user.skype,
      'oldPassword': ['', Validators.required],
      'rePassword': ''
    });
  }

  submitForm(value: any) {

    if(this.formInfo === 'info') {
      if(value.email !== '' && value.hoten !== '') {
        delete value.oldPassword;
        delete value.rePassword;
        if (this.prefixEmail && this.prefixEmail !== '' && value.email.split(this.prefixEmail).length === 1) {
          value.email = this.prefixEmail + value.email;
        }
        value.username = this.user.username;
        this.userService.capnhatUser(value)
          .then(user => {
            this.user = user;
            this.hasError = false;
            this.editSuccess = true;
            this.successMsg = [{
              msg: 'Cập nhật thông tin cá nhân thành công !'
            }];
            window.scrollTo(0, 0);
          })
          .catch(err => {
            console.error(err);
            this.editSuccess = false;
            this.hasError = true;
            window.scrollTo(0, 0);
            if (err !== 'fail') {
              this.errorMsg = [{
                msg: err
              }];
            } else {
              this.errorMsg = [{
                msg: 'Cập nhật thông tin cá nhân thất bại !'
              }];
            }
          });
      } else {
        this.editSuccess = false;
        this.hasError = true;
        this.errorMsg = [{
          msg: 'Cập nhật thông tin cá nhân thất bại !'
        }];
        window.scrollTo(0, 0);
      }
    } else {
      if(this.user.password === value.oldPassword) {
        if (!value.password || value.password === '') {
          this.editSuccess = false;
          this.hasError = true;
          this.errorMsg = [{
            msg: 'Mật khẩu mới không được để trống !'
          }];
          window.scrollTo(0, 0);
        } else if (value.password === value.rePassword) {
          this.hasError = false;
          if (Constants.patternPassword.test(value.password)) {
            this.errorPattern = false;
            delete value.oldPassword;
            delete value.rePassword;
            if (this.prefixEmail && this.prefixEmail !== '' && value.email.split(this.prefixEmail).length === 1) {
              value.email = this.prefixEmail + value.email;
            }
            value.username = this.user.username;
            this.userService.capnhatPassword(value).then(user => {
              this.user = user;
              this.hasError = false;
              this.editSuccess = true;
              this.successMsg = [{
                msg: 'Cập nhật mật khẩu thành công !'
              }, {
                msg: 'Bạn sẽ được đăng xuất ra ngay bây giờ ! Vui lòng đăng nhập lại'
              }];
              window.scrollTo(0, 0);
              setTimeout(() => {
                this.userService.logout();
              }, 5000);
            })
              .catch(err => {
                console.error(err);
                this.editSuccess = false;
                this.hasError = true;
                this.errorMsg = [{
                  msg: 'Cập nhật mật khẩu thất bại !'
                }];
                window.scrollTo(0, 0);
              });
          } else {
            this.errorPattern = true;
          }
        } else {
          this.editSuccess = false;
          this.hasError = true;
          this.errorMsg = [{
            msg: 'Nhập lại mật khẩu không trùng khớp !'
          }];
          window.scrollTo(0, 0);
        }
      } else {
        this.editSuccess = false;
        this.hasError = true;
        this.errorMsg = [{
          msg: 'Mật khẩu cũ không đúng !'
        }];
        window.scrollTo(0, 0);
      }
    }
  }

  closeAlert(typeMsg) {
    if(typeMsg === 'error') {
      this.errorMsg.splice(0, 1);
    } else {
      this.successMsg.splice(0, 1);
    }
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
