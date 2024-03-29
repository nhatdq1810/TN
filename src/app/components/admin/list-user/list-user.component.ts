import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DetailPopupComponent } from '../detail-popup/detail-popup.component';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { UserService } from '../../../services/user.service';

let Constants = require('../../../resources/constants');

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  @ViewChild('detailPopup') detailPopup: DetailPopupComponent;
  @ViewChild('confirmPopup') confirmPopup: ConfirmPopupComponent;
  private listUser: Array<any> = [];
  private listUserView: Array<any> = [];
  private checkAllUser: boolean;
  private listCheckbox: Array<any> = [];
  private listCheckboxView: Array<boolean> = [];
  private selectedUser: any;

  constructor(private toastr: ToastsManager, private userService: UserService) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.listUser = [];
    this.listUserView = [];
    this.listCheckbox = [];
    this.listCheckboxView = [];

    this.checkAllUser = false;
    this.userService.layTatcaUser()
      .then(result => {
        this.listUser = result;
        this.listUserView = result;
        for (let i = 0; i < this.listUserView.length; ++i) {
          this.listCheckboxView[this.listUserView[i].id] = false;
        }
      })
      .catch(err => {
        console.error(err);
        this.listUser = [];
        this.listUserView = [];
      });
  }

  searchUser(term: string) {
    if (term && term !== '') {
      this.listUserView = [];
      for (let i = 0; i < this.listUser.length; i++) {
        for (let propUser in this.listUser[i]) {
          if (this.listUser[i][propUser].toString().indexOf(term) > -1) {
            this.listUserView.push(this.listUser[i]);
            break;
          }
        }
      }
    } else {
      this.listUserView = this.listUser;
    }
    this.listCheckbox = [];
    this.checkAllUser = true;
    for (let i = 0; i < this.listUserView.length; i++) {
      let value = this.listUserView[i];
      if (this.listCheckboxView[value.id]) {
        this.listCheckbox.push(value);
      } else {
        this.checkAllUser = false;
      }
    }
  }

  updateCheckAll(event, user) {
    this.listCheckboxView[user.id] = event;
    this.checkAllUser = this.listUserView.every((value) => {
      return this.listCheckboxView[value.id] === true;
    });
    let indexUser = this.listCheckbox.indexOf(user);
    if (event) {
      if (indexUser === -1) {
        this.listCheckbox.push(user);
      }
    } else {
      if(indexUser > -1) {
        this.listCheckbox.splice(indexUser, 1);
      }
    }
  }

  checkAll() {
    let valueSet = !this.listUserView.every((value) => {
      return this.listCheckboxView[value.id] === true;
    });
    this.listCheckbox = [];
    if (valueSet) {
      this.listUserView.forEach((value) => {
        this.listCheckboxView[value.id] = valueSet;
        this.listCheckbox.push(value);
      });
    } else {
      this.listUserView.forEach((value) => {
        this.listCheckboxView[value.id] = valueSet;
      });
    }
  }

  deleteUser() {
    if (this.listCheckbox.length > 0) {
      this.confirmPopup.showPopup();
    }
  }

  popupClose(e: any) {
    if (e) {
      this.init();
    }
  }
}
