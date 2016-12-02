import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DetailPopupComponent } from '../detail-popup/detail-popup.component';
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
  private listPTNotChecked: Array<any> = [];
  private listPTNotCheckedView: Array<any> = [];
  private listUser: Array<any> = [];
  private listPTCheckbox: Array<any> = [];
  private listPTCheckboxView: Array<boolean> = [];
  private checkAllPT: boolean;
  private selectedPT: any;

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
          this.listPTCheckboxView[this.listPTNotCheckedView[i].id] = false;
          this.userService.layThongtinUserID(this.listPTNotCheckedView[i].userID)
            .then(resp => {
              if (!this.listUser[this.listPTNotCheckedView[i].userID]) {
                this.listUser[this.listPTNotCheckedView[i].userID] = resp;
              }
            })
            .catch(err => {
              console.error(err);
              this.listUser[this.listPTNotCheckedView[i].userID] = 'Không xác định';
            });
        }
      });
  }

  showDetailItem(item) {
    this.selectedPT = item;
    this.detailPopup.showPopup();
  }

  updateCheckAll(event, pt) {
    this.listPTCheckboxView[pt.id] = event;
    this.checkAllPT = this.listPTNotCheckedView.every((value) => {
      return this.listPTCheckboxView[value.id] === true;
    });
    let indexPT = this.listPTCheckbox.indexOf(pt.id);
    if (event) {
      if (indexPT === -1) {
        this.listPTCheckbox.push(pt.id);
      }
    } else {
      if(indexPT > -1) {
        this.listPTCheckbox.splice(indexPT, 1);
      }
    }
  }

  checkAll() {
    let valueSet = !this.listPTNotCheckedView.every((value) => {
      return this.listPTCheckboxView[value.id] === true;
    });

    this.listPTCheckbox = [];
    if (valueSet) {
      this.listPTNotCheckedView.forEach((value) => {
        this.listPTCheckboxView[value.id] = valueSet;
        this.listPTCheckbox.push(value.id);
      });
    } else {
      this.listPTNotCheckedView.forEach((value) => {
        this.listPTCheckboxView[value.id] = valueSet;
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
    this.listPTCheckbox = [];
    this.checkAllPT = true;
    for (let i = 0; i < this.listPTNotCheckedView.length; i++) {
      let value = this.listPTNotCheckedView[i];
      if (this.listPTCheckboxView[value.id]) {
        this.listPTCheckbox.push(value.id);
      } else {
        this.checkAllPT = false;
      }
    }
  }

  deletePT() {
    console.log(this.listPTCheckbox);
    if(this.listPTCheckbox.length > 0) {
      this.toastr.success('Đã xóa phòng trọ', 'Thành công !');
    }
  }

  acceptPT() {
    console.log(this.listPTCheckbox);
    if (this.listPTCheckbox.length > 0) {
      this.toastr.success('Đã duyệt phòng trọ', 'Thành công !');
    }
  }

  denyPT() {
    console.log(this.listPTCheckbox);
    if (this.listPTCheckbox.length > 0) {
      this.toastr.success('Đã hủy chấp nhận phòng trọ', 'Thành công !');
    }
  }

  fakeInit() {
    this.checkAllPT = false;
    this.listPTNotChecked = Constants.fakeListPT;
    for (let i = 0; i < this.listPTNotChecked.length; ++i) {
      this.listPTCheckboxView[this.listPTNotChecked[i].id] = false;
    }
  }

}
