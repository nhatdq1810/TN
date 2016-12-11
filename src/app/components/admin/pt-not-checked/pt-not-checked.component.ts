import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DetailPopupComponent } from '../detail-popup/detail-popup.component';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { PhongtroService } from '../../../services/phongtro.service';
import { UserService } from '../../../services/user.service';

let Constants = require('../../../resources/constants');

@Component({
  selector: 'app-pt-not-checked',
  templateUrl: './pt-not-checked.component.html',
  styleUrls: ['./pt-not-checked.component.css']
})
export class PtNotCheckedComponent implements OnInit {

  @ViewChild('detailPopup') detailPopup: DetailPopupComponent;
  @ViewChild('confirmPopup') confirmPopup: ConfirmPopupComponent;
  private listPTNotChecked: Array<any> = [];
  private listPTNotCheckedView: Array<any> = [];
  private listUser: Array<any> = [];
  private listCheckbox: Array<any> = [];
  private listCheckboxView: Array<boolean> = [];
  private checkAllPT: boolean;
  private selectedPT: any;
  private confirmSelectedPT: Array<any> = [];
  private isDelete: boolean;

  constructor(private toastr: ToastsManager, private ptService: PhongtroService, private userService: UserService) {
    // this.fakeInit();
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.checkAllPT = false;
    this.ptService.layTatcaPhongtro(0)
      .then(result => {
        this.listPTNotChecked = result;
        this.listPTNotCheckedView = result;
        for (let i = 0; i < this.listPTNotCheckedView.length; ++i) {
          this.listCheckboxView[this.listPTNotCheckedView[i].id] = false;
          this.userService.layThongtinUserID(this.listPTNotCheckedView[i].userID)
            .then(resp => {
              if (!this.listUser[this.listPTNotCheckedView[i].userID]) {
                this.listUser[this.listPTNotCheckedView[i].userID] = resp;
              }
            })
            .catch(err => {
              console.error(err);
              this.listUser[this.listPTNotCheckedView[i].userID].username = 'Không xác định';
            });
        }
      })
      .catch(err => {
        console.error(err);
        this.listPTNotChecked = [];
        this.listPTNotCheckedView = [];
      });
  }

  showDetailItem(item) {
    this.selectedPT = item;
    this.detailPopup.showPopup();
  }

  updateCheckAll(event, pt) {
    this.listCheckboxView[pt.id] = event;
    this.checkAllPT = this.listPTNotCheckedView.every((value) => {
      return this.listCheckboxView[value.id] === true;
    });
    let indexPT = this.listCheckbox.indexOf(pt.id);
    if (event) {
      if (indexPT === -1) {
        this.confirmSelectedPT.push(pt);
        this.listCheckbox.push(pt.id);
      }
    } else {
      if(indexPT > -1) {
        let tmpIndex = this.confirmSelectedPT.indexOf(pt);
        if(tmpIndex > -1) {
          this.confirmSelectedPT.splice(tmpIndex, 1);
        }
        this.listCheckbox.splice(indexPT, 1);
      }
    }
  }

  checkAll() {
    let valueSet = !this.listPTNotCheckedView.every((value) => {
      return this.listCheckboxView[value.id] === true;
    });

    this.listCheckbox = [];
    this.confirmSelectedPT = [];
    if (valueSet) {
      this.listPTNotCheckedView.forEach((value) => {
        this.listCheckboxView[value.id] = valueSet;
        this.confirmSelectedPT.push(value);
        this.listCheckbox.push(value.id);
      });
    } else {
      this.listPTNotCheckedView.forEach((value) => {
        this.listCheckboxView[value.id] = valueSet;
      });
    }
  }

  searchPT(term: string) {
    if (term && term !== '') {
      this.listPTNotCheckedView = [];
      for (let i = 0; i < this.listPTNotChecked.length; i++) {
        for (let propPT in this.listPTNotChecked[i]) {
          if (this.listPTNotChecked[i][propPT].toString().indexOf(term) > -1) {
            this.listPTNotCheckedView.push(this.listPTNotChecked[i]);
            break;
          } else if (this.listUser[this.listPTNotChecked[i].userID].username.indexOf(term) > -1) {
            this.listPTNotCheckedView.push(this.listPTNotChecked[i]);
            break;
          }
        }
      }
    } else {
      this.listPTNotCheckedView = this.listPTNotChecked;
    }
    this.listCheckbox = [];
    this.checkAllPT = true;
    for (let i = 0; i < this.listPTNotCheckedView.length; i++) {
      let value = this.listPTNotCheckedView[i];
      if (this.listCheckboxView[value.id]) {
        this.listCheckbox.push(value.id);
      } else {
        this.checkAllPT = false;
      }
    }
  }

  deletePT() {
    if(this.listCheckbox.length > 0) {
      this.isDelete = true;
      this.confirmPopup.showPopup();
      // for (let i = 0; i < this.listCheckbox.length; i++) {
      //   this.ptService.adminXoaPhongtro(this.listCheckbox[i], 0)
      //     .then(result => {
      //       if(i === (this.listCheckbox.length - 1)) {
      //         this.init();
      //       }
      //       this.toastr.success(`Đã xóa phòng trọ ${this.listCheckbox[i]}`, 'Thành công !');
      //     })
      //     .catch(err => {
      //       console.error(err);
      //       this.toastr.error(`Xóa thất bại phòng trọ ${this.listCheckbox[i]}`, 'Xảy ra lỗi !');
      //       this.init();
      //     });
      // }
    }
  }

  acceptPT() {
    if (this.listCheckbox.length > 0) {
      this.ptService.xetduyetPT(this.listCheckbox, 1)
        .then(result => {
          this.toastr.success('Đã duyệt tất cả phòng trọ', 'Thành công !');
          this.init();
        })
        .catch(err => {
          console.error(err);
          this.toastr.error(`Duyệt thất bại`, 'Xảy ra lỗi !');
          this.init();
        });
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

  popupClose(e: any) {
    if (e) {
      this.init();
    }
  }

  fakeInit() {
    this.checkAllPT = false;
    this.listPTNotChecked = Constants.fakeListPT;
    this.listPTNotCheckedView = Constants.fakeListPT;
    this.listUser = Constants.fakeListUser;
    for (let i = 0; i < this.listPTNotChecked.length; ++i) {
      this.listCheckboxView[this.listPTNotChecked[i].id] = false;
    }
  }

}
