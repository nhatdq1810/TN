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
  private hintReason: Array<string> = [];

  constructor(private toastr: ToastsManager, private ptService: PhongtroService, private userService: UserService) { }

  ngOnInit() {
  }

  showPopup() {
    this.reason = [];
    this.hintReason = ['Địa chỉ', 'Giá thuê nguyên phòng', 'Giá thuê từng người', 'Tiền cọc nguyên phòng', 'Tiền cọc từng người', 'Diện tích', 'Số phòng còn trống', 'Wifi', 'Ở với chủ', 'Ghi chú'];
    this.confirmPopup.show();
  }

  closePopup(result) {
    this.popupClose.emit(result);
    this.confirmPopup.hide();
  }

  deletePT() {
    this.ptService.adminXoaPhongtro(this.info, this.reason)
      .then(result => {
        this.toastr.success(`Đã xóa các phòng trọ`, 'Thành công !');
        this.closePopup(true);
      })
      .catch(err => {
        console.error(err);
        this.closePopup(false);
        this.toastr.error(`Xóa thất bại các phòng trọ`, 'Xảy ra lỗi !');
      });
  }

  denyPT() {
    this.ptService.xetduyetPT(this.info, this.reason, -1)
      .then(result => {
        this.closePopup(true);
        this.toastr.success('Đã hủy chấp nhận các phòng trọ', 'Thành công !');
      })
      .catch(err => {
        console.error(err);
        this.closePopup(false);
        this.toastr.error(`Hủy chấp nhận thất bại các phòng trọ`, 'Xảy ra lỗi !');
      });
  }

  deleteUser() {
    this.userService.xoaUser(this.info, this.reason)
      .then(result => {
        if(result === 'fail') {
          this.closePopup(false);
          this.toastr.error(`Xóa thất bại các user`, 'Xảy ra lỗi !');
        } else {
          this.closePopup(true);
          this.toastr.success(`Đã xóa các user`, 'Thành công !');
        }
      })
      .catch(err => {
        console.error(err);
        this.closePopup(false);
        this.toastr.error(`Xóa thất bại các user`, 'Xảy ra lỗi !');
      });
  }
}
