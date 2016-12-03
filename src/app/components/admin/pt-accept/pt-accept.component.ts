import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DetailPopupComponent } from '../detail-popup/detail-popup.component';
import { PhongtroService } from '../../../services/phongtro.service';
import { UserService } from '../../../services/user.service';

let Constants = require('../../../resources/constants');

@Component({
  selector: 'app-pt-accept',
  templateUrl: './pt-accept.component.html',
  styleUrls: ['./pt-accept.component.css']
})
export class PtAcceptComponent implements OnInit {

  @ViewChild('detailPopup') detailPopup: DetailPopupComponent;
  private listPTAccept: Array<any> = [];
  private listPTAcceptView: Array<any> = [];
  private listUser: Array<any> = [];
  private listCheckbox: Array<any> = [];
  private listCheckboxView: Array<boolean> = [];
  private checkAllPT: boolean;
  private selectedPT: any;

  constructor(private toastr: ToastsManager, private ptService: PhongtroService, private userService: UserService) {
    this.init();
    // this.fakeInit();
  }

  ngOnInit() {
  }

  init() {
    this.checkAllPT = false;
    this.ptService.layTatcaPhongtro(1)
      .then(result => {
        this.listPTAccept = result;
        this.listPTAcceptView = result;
        for (let i = 0; i < this.listPTAcceptView.length; ++i) {
          this.listCheckboxView[this.listPTAcceptView[i].id] = false;
          this.userService.layThongtinUserID(this.listPTAcceptView[i].userID)
            .then(resp => {
              if (!this.listUser[this.listPTAcceptView[i].userID]) {
                this.listUser[this.listPTAcceptView[i].userID] = resp;
              }
            })
            .catch(err => {
              console.error(err);
              this.listUser[this.listPTAcceptView[i].userID] = 'Không xác định';
            });
        }
      })
      .catch(err => {
        console.error(err);
        this.listPTAccept = [];
        this.listPTAcceptView = [];
      });
  }

  showDetailItem(item) {
    this.selectedPT = item;
    this.detailPopup.showPopup();
  }

  searchPT(term: string) {
    if (term && term !== '') {
      this.listPTAcceptView = [];
      for (let i = 0; i < this.listPTAccept.length; i++) {
        for (let propPT in this.listPTAccept[i]) {
          if (this.listPTAccept[i][propPT].toString().indexOf(term) > -1) {
            this.listPTAcceptView.push(this.listPTAccept[i]);
            break;
          } else if (this.listUser[this.listPTAccept[i].userID].username.indexOf(term) > -1) {
            this.listPTAcceptView.push(this.listPTAccept[i]);
            break;
          }
        }
      }
    } else {
      this.listPTAcceptView = this.listPTAccept;
    }
    this.listCheckbox = [];
    this.checkAllPT = true;
    for (let i = 0; i < this.listPTAcceptView.length; i++) {
      let value = this.listPTAcceptView[i];
      if (this.listCheckboxView[value.id]) {
        this.listCheckbox.push(value.id);
      } else {
        this.checkAllPT = false;
      }
    }
  }

  updateCheckAll(event, pt) {
    this.listCheckboxView[pt.id] = event;
    this.checkAllPT = this.listPTAcceptView.every((value) => {
      return this.listCheckboxView[value.id] === true;
    });
    let indexPT = this.listCheckbox.indexOf(pt.id);
    if (event) {
      if (indexPT === -1) {
        this.listCheckbox.push(pt.id);
      }
    } else {
      if(indexPT > -1) {
        this.listCheckbox.splice(indexPT, 1);
      }
    }
  }

  checkAll() {
    let valueSet = !this.listPTAcceptView.every((value) => {
      return this.listCheckboxView[value.id] === true;
    });
    this.listCheckbox = [];
    if (valueSet) {
      this.listPTAcceptView.forEach((value) => {
        this.listCheckboxView[value.id] = valueSet;
        this.listCheckbox.push(value.id);
      });
    } else {
      this.listPTAcceptView.forEach((value) => {
        this.listCheckboxView[value.id] = valueSet;
      });
    }
  }

  deletePT() {
    if (this.listCheckbox.length > 0) {
      for (let i = 0; i < this.listCheckbox.length; i++) {
        this.ptService.adminXoaPhongtro(this.listCheckbox[i], 0)
          .then(result => {
            if (i === (this.listCheckbox.length - 1)) {
              this.init();
            }
            this.toastr.success(`Đã xóa phòng trọ ${this.listCheckbox[i]}`, 'Thành công !');
          })
          .catch(err => {
            console.error(err);
            this.toastr.error(`Xóa thất bại phòng trọ ${this.listCheckbox[i]}`, 'Xảy ra lỗi !');
            this.init();
          });
      }
    }
  }

  denyPT() {
    if (this.listCheckbox.length > 0) {
      this.ptService.xetduyetPT(this.listCheckbox, -1)
        .then(result => {
          this.toastr.success('Đã hủy chấp nhận phòng trọ', 'Thành công !');
          this.init();
        })
        .catch(err => {
          console.error(err);
          this.toastr.error(`Hủy chấp nhận thất bại`, 'Xảy ra lỗi !');
          this.init();
        });
    }
  }

  fakeInit() {
    this.checkAllPT = false;
    this.listPTAccept = Constants.fakeListPT;
    for (let i = 0; i < this.listPTAccept.length; ++i) {
      this.listCheckboxView[i] = false;
    }
  }

}
