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
  private isReasonEmpty: Array<any> = [];
  private errorMsg: Array<any> = [];
  private msg: string;
  private isError: boolean;

  constructor(private toastr: ToastsManager, private ptService: PhongtroService, private userService: UserService) { }

  ngOnInit() {
  }

  showPopup() {
    this.reason = [];
    this.isReasonEmpty = [];
    this.errorMsg = [{
      msg: ''
    }];
    if (this.isUser) {
      this.msg = 'User ';
    } else {
      this.msg = 'Phòng trọ ';
    }
    this.isError = false;
    this.confirmPopup.show();
  }

  closePopup(result) {
    this.popupClose.emit(result);
    this.confirmPopup.hide();
  }

  closeAlert() {
    this.errorMsg.splice(0, 1);
  }

  deletePT() {
    let listInfo = [];
    for (let i = 0; i < this.info.length; i++) {
      if (this.reason[this.info[i].id] && this.reason[this.info[i].id] !== '') {
        listInfo.push(this.info[i]);
      } else {
        this.isReasonEmpty.push(this.info[i].id);
        if (i === (this.info.length - 1)) {
          this.msg += `${this.info[i].id}`;
        } else {
          this.msg += `${this.info[i].id}, `;
        }
      }
    }

    this.ptService.adminXoaPhongtro(listInfo, this.reason)
      .then(result => {
        this.toastr.success(`Đã xóa các phòng trọ`, 'Thành công !');
        for (let i = 0; i < listInfo.length; i++) {
          this.info.splice(this.info.indexOf(listInfo[i]), 1);
        }
        if(this.info.length === 0) {
          this.isError = false;
          this.closePopup(true);
        } else {
          this.isError = true;
          this.errorMsg = [{
            msg: this.msg
          }, {
            msg: 'Không có lý do để xóa các phòng trọ'
          }];
        }
      })
      .catch(err => {
        console.error(err);
        this.closePopup(false);
        this.toastr.error(`Xóa thất bại các phòng trọ`, 'Xảy ra lỗi !');
      });
  }

  denyPT() {
    let listInfo = [];
    for (let i = 0; i < this.info.length; i++) {
      if (this.reason[this.info[i].id] && this.reason[this.info[i].id] !== '') {
        listInfo.push(this.info[i]);
      } else {
        this.isReasonEmpty.push(this.info[i].id);
        if (i === (this.info.length - 1)) {
          this.msg += `${this.info[i].id}`;
        } else {
          this.msg += `${this.info[i].id}, `;
        }
      }
    }
    this.ptService.xetduyetPT(this.info, this.reason, -1)
      .then(result => {
        this.toastr.success('Đã hủy chấp nhận các phòng trọ', 'Thành công !');
        for (let i = 0; i < listInfo.length; i++) {
          this.info.splice(this.info.indexOf(listInfo[i]), 1);
        }
        if (this.info.length === 0) {
          this.isError = false;
          this.closePopup(true);
        } else {
          this.isError = true;
          this.errorMsg = [{
            msg: this.msg
          }, {
            msg: 'Không có lý do để hủy chấp nhận các phòng trọ'
          }];
        }
      })
      .catch(err => {
        console.error(err);
        this.closePopup(false);
        this.toastr.error(`Hủy chấp nhận thất bại các phòng trọ`, 'Xảy ra lỗi !');
      });
  }

  deleteUser() {
    let listInfo = [];
    for (let i = 0; i < this.info.length; i++) {
      if (this.reason[this.info[i].id] && this.reason[this.info[i].id] !== '') {
        listInfo.push(this.info[i]);
      } else {
        this.isReasonEmpty.push(this.info[i].id);
        if (i === (this.info.length - 1)) {
          this.msg += `${this.info[i].username}`;
        } else {
          this.msg += `${this.info[i].username}, `;
        }
      }
    }
    this.userService.xoaUser(this.info, this.reason)
      .then(result => {
        if(result === 'fail') {
          this.toastr.error(`Xóa thất bại các user`, 'Xảy ra lỗi !');
          this.closePopup(false);
        } else {
          this.toastr.success(`Đã xóa các user`, 'Thành công !');
          for (let i = 0; i < listInfo.length; i++) {
            this.info.splice(this.info.indexOf(listInfo[i]), 1);
          }
          if (this.info.length === 0) {
            this.isError = false;
            this.closePopup(true);
          } else {
            this.isError = true;
            this.errorMsg = [{
              msg: this.msg
            }, {
              msg: 'Không có lý do để xóa các user'
            }];
          }
        }
      })
      .catch(err => {
        console.error(err);
        this.closePopup(false);
        this.toastr.error(`Xóa thất bại các user`, 'Xảy ra lỗi !');
      });
  }
}
