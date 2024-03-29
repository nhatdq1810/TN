import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DetailPopupComponent } from '../detail-popup/detail-popup.component';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { PhongtroService } from '../../../services/phongtro.service';
import { UserService } from '../../../services/user.service';

let Constants = require('../../../resources/constants');

@Component({
  selector: 'app-pt-not-accept',
  templateUrl: './pt-not-accept.component.html',
  styleUrls: ['./pt-not-accept.component.css']
})
export class PtNotAcceptComponent implements OnInit {

  @ViewChild('detailPopup') detailPopup: DetailPopupComponent;
  @ViewChild('confirmPopup') confirmPopup: ConfirmPopupComponent;
  private listCheckbox: Array<any> = [];
  private listCheckboxView: Array<boolean> = [];
  private listUser: Array<any> = [];
  private listPTNotAccept: Array<any> = [];
  private listPTNotAcceptView: Array<any> = [];
  private checkAllPT: boolean;
  private selectedPT: any;
  private isDelete: boolean;

  constructor(private toastr: ToastsManager, private ptService: PhongtroService, private userService: UserService) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.listUser = [];
    this.listPTNotAccept = [];
    this.listPTNotAcceptView = [];
    this.listCheckbox = [];
    this.listCheckboxView = [];

    this.checkAllPT = false;
    this.ptService.layTatcaPhongtro(-1)
      .then(result => {
        this.listPTNotAccept = result;
        this.listPTNotAcceptView = result;
        for (let i = 0; i < this.listPTNotAcceptView.length; ++i) {
          this.listCheckboxView[this.listPTNotAcceptView[i].id] = false;
          this.userService.layThongtinUserID(this.listPTNotAcceptView[i].userID)
            .then(resp => {
              if (!this.listUser[this.listPTNotAcceptView[i].userID]) {
                this.listUser[this.listPTNotAcceptView[i].userID] = resp;
              }
            })
            .catch(err => {
              console.error(err);
              this.listUser[this.listPTNotAcceptView[i].userID].username = 'Không xác định';
            });
        }
      })
      .catch(err => {
        console.error(err);
        this.listPTNotAccept = [];
        this.listPTNotAcceptView = [];
      });
  }


  showDetailItem(item) {
    this.selectedPT = item;
    this.detailPopup.showPopup();
  }

  searchPT(term: string) {
    if (term && term !== '') {
      this.listPTNotAcceptView = [];
      for (let i = 0; i < this.listPTNotAccept.length; i++) {
        for (let propPT in this.listPTNotAccept[i]) {
          if (this.listPTNotAccept[i][propPT].toString().indexOf(term) > -1) {
            this.listPTNotAcceptView.push(this.listPTNotAccept[i]);
            break;
          } else if (this.listUser[this.listPTNotAccept[i].userID].username.indexOf(term) > -1) {
            this.listPTNotAcceptView.push(this.listPTNotAccept[i]);
            break;
          }
        }
      }
    } else {
      this.listPTNotAcceptView = this.listPTNotAccept;
    }
    this.listCheckbox = [];
    this.checkAllPT = true;
    for (let i = 0; i < this.listPTNotAcceptView.length; i++) {
      let value = this.listPTNotAcceptView[i];
      if (this.listCheckboxView[value.id]) {
        this.listCheckbox.push(value);
      } else {
        this.checkAllPT = false;
      }
    }
  }

  updateCheckAll(event, pt) {
    this.listCheckboxView[pt.id] = event;
    this.checkAllPT = this.listPTNotAcceptView.every((value) => {
      return this.listCheckboxView[value.id] === true;
    });
    let indexPT = this.listCheckbox.indexOf(pt);
    if (event) {
      if (indexPT === -1) {
        this.listCheckbox.push(pt);
      }
    } else {
      if(indexPT > -1) {
        this.listCheckbox.splice(indexPT, 1);
      }
    }
  }

  checkAll() {
    let valueSet = !this.listPTNotAcceptView.every((value) => {
      return this.listCheckboxView[value.id] === true;
    });
    this.listCheckbox = [];
    if (valueSet) {
      this.listPTNotAcceptView.forEach((value) => {
        this.listCheckboxView[value.id] = valueSet;
        this.listCheckbox.push(value);
      });
    } else {
      this.listPTNotAcceptView.forEach((value) => {
        this.listCheckboxView[value.id] = valueSet;
      });
    }
  }

  deletePT() {
    if (this.listCheckbox.length > 0) {
      this.isDelete = true;
      this.confirmPopup.showPopup();
    }
  }

  popupClose(e: any) {
    if (e) {
      this.init();
    }
  }
}
