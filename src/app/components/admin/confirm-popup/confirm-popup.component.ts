import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { PhongtroService } from '../../../services/phongtro.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent implements OnInit {

  @ViewChild('confirmPopup') confirmPopup: ModalDirective;
  @Output() popupClose = new EventEmitter();
  @Input() info: Array<any>;
  @Input() isDelete: boolean;
  @Input() isUser: boolean;
  private reason: Array<string> = [];
  private msg: string;

  constructor(private toastr: ToastsManager, private ptService: PhongtroService, private userService: UserService) { }

  ngOnInit() {
  }

  showPopup() {
    this.reason = [];
    if (this.isUser) {
      this.msg = 'user ';
    } else {
      this.msg = 'phòng trọ ';
    }
    this.confirmPopup.show();
  }

  closePopup(result) {
    this.popupClose.emit(result);
    this.confirmPopup.hide();
  }

  deletePT() {
    let listInfo = [];
    for (let i = 0; i < this.info.length; i++) {
      if (this.reason[this.info[i].id] && this.reason[this.info[i].id] !== '') {
        listInfo.push(this.info[i]);
        this.msg += `${this.info[i].id} `;
      }
    }

    this.ptService.adminXoaPhongtro(listInfo, this.reason)
      .then(result => {
        for (let i = 0; i < listInfo.length; i++) {
          if (this.info.indexOf(listInfo[i]) > -1) {
            this.info.splice(this.info.indexOf(listInfo[i]), 1);
          }
        }
        if(this.info.length === 0) {
          this.closePopup(true);
        }
        this.toastr.success(`Đã xóa các ${this.msg}`, 'Thành công !');
      })
      .catch(err => {
        console.error(err);
        this.closePopup(false);
        this.toastr.error(`Xóa thất bại các ${this.msg}`, 'Xảy ra lỗi !');
      });
  }

  denyPT() {
    let listInfo = [];
    for (let i = 0; i < this.info.length; i++) {
      if (this.reason[this.info[i].id] && this.reason[this.info[i].id] !== '') {
        listInfo.push(this.info[i]);
        this.msg += `${this.info[i].id} `;
      }
    }
    this.ptService.xetduyetPT(listInfo, this.reason, -1)
      .then(result => {
        for (let i = 0; i < listInfo.length; i++) {
          if (this.info.indexOf(listInfo[i]) > -1) {
            this.info.splice(this.info.indexOf(listInfo[i]), 1);
          }
        }
        if (this.info.length === 0) {
          this.closePopup(true);
        }
        this.toastr.success(`Đã hủy chấp nhận các ${this.msg}`, 'Thành công !');
      })
      .catch(err => {
        console.error(err);
        this.closePopup(false);
        this.toastr.error(`Hủy chấp nhận thất bại các ${this.msg}`, 'Xảy ra lỗi !');
      });
  }

  deleteUser() {
    let listInfo = [];
    for (let i = 0; i < this.info.length; i++) {
      if (this.reason[this.info[i].id] && this.reason[this.info[i].id] !== '') {
        listInfo.push(this.info[i]);
        this.msg += `${this.info[i].username} `;
      }
    }
    this.userService.xoaUser(listInfo, this.reason)
      .then(result => {
        for (let i = 0; i < listInfo.length; i++) {
          if(this.info.indexOf(listInfo[i]) > -1) {
            this.info.splice(this.info.indexOf(listInfo[i]), 1);
          }
        }
        if (this.info.length === 0) {
          this.closePopup(true);
        }
        this.toastr.success(`Đã xóa các ${this.msg}`, 'Thành công !');
      })
      .catch(err => {
        console.error(err);
        this.closePopup(false);
        this.toastr.error(`Xóa thất bại các ${this.msg}`, 'Xảy ra lỗi !');
      });
  }
}
