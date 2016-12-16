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
    this.isError = false;
    // this.hintReason = ['Địa chỉ', 'Giá thuê nguyên phòng', 'Giá thuê từng người', 'Tiền cọc nguyên phòng', 'Tiền cọc từng người', 'Diện tích', 'Số phòng còn trống', 'Wifi', 'Ở với chủ', 'Ghi chú'];
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
    let msg = '';
    if(this.isUser) {
      msg = 'User ';
    } else {
      msg = 'Phòng trọ ';
    }
    for (let i = 0; i < this.info.length; i++) {
      if (this.reason[this.info[i].id] && this.reason[this.info[i].id] !== '') {
        listInfo.push(this.info[i]);
      } else {
        this.isReasonEmpty.push(this.info[i].id);
        if(this.isUser) {
          if(i === (this.info.length - 1)) {
            msg += `${this.info[i].username}`;
          } else {
            msg += `${this.info[i].username}, `;
          }
        } else {
          if (i === (this.info.length - 1)) {
            msg += `${this.info[i].id}`;
          } else {
            msg += `${this.info[i].id}, `;
          }
        }
      }
    }
    for (let i = 0; i < listInfo.length; i++) {
      this.info.splice(this.info.indexOf(listInfo[i]), 1);
    }
    if(this.info.length !== 0) {
      this.isError = true;
      if (this.isUser) {
        this.errorMsg = [{
          msg: msg
        },{
          msg: 'Không có lý dó để xóa user'
        }];
      } else {
        this.errorMsg = [{
          msg: msg
        },{
          msg: 'Không có lý dó để xóa / hủy duyệt phòng trọ'
        }];
      }
    }

    // this.ptService.adminXoaPhongtro(listInfo, this.reason)
    //   .then(result => {
    //     this.toastr.success(`Đã xóa các phòng trọ`, 'Thành công !');
    //     for (let i = 0; i < listInfo.length; i++) {
    //       this.info.splice(this.info.indexOf(listInfo[i]), 1);
    //     }
    //     if(this.info.length === 0) {
    //       this.closePopup(true);
    //     } else {
    //       this.isError = true;
    //       if(this.isUser) {
    //         this.errorMsg = [{
    //           msg: 'Không có lý dó để xóa user'
    //         }];
    //       } else {
    //         this.errorMsg = [{
    //           msg: 'Không có lý dó để xóa / hủy duyệt phòng trọ'
    //         }];
    //       }
    //     }
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     this.closePopup(false);
    //     this.toastr.error(`Xóa thất bại các phòng trọ`, 'Xảy ra lỗi !');
    //   });
  }

  denyPT() {
    let listInfo = [];
    for (let i = 0; i < this.info.length; i++) {
      if (this.reason[this.info[i].id] && this.reason[this.info[i].id] !== '') {
        listInfo.push(this.info[i]);
      } else {
        this.isReasonEmpty.push(this.info[i].id);
      }
    }
    this.ptService.xetduyetPT(this.info, this.reason, -1)
      .then(result => {
        this.toastr.success('Đã hủy chấp nhận các phòng trọ', 'Thành công !');
        for (let i = 0; i < listInfo.length; i++) {
          this.info.splice(this.info.indexOf(listInfo[i]), 1);
        }
        if(this.info.length === 0) {
          this.closePopup(true);
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
            this.closePopup(true);
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
