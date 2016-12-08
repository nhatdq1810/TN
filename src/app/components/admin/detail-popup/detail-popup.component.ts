import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { PhongtroService } from '../../../services/phongtro.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-detail-popup',
  templateUrl: './detail-popup.component.html',
  styleUrls: ['./detail-popup.component.css']
})
export class DetailPopupComponent implements OnInit {

  @ViewChild('detailPopup') detailPopup: ModalDirective;
  @Input() info: any;
  @Input() showAcceptBtn: boolean;
  @Input() showDenyBtn: boolean;

  constructor(private toastr: ToastsManager, private ptService: PhongtroService, private userService: UserService) {
  }

  ngOnInit() {
  }

  init() {

  }

  showPopup() {
    this.detailPopup.show();
  }

  closePopup() {
    this.detailPopup.hide();
  }

  deletePT() {
    console.log(this.info.id);
    this.ptService.adminXoaPhongtro(this.info.id, 0)
      .then(result => {
        this.closePopup();
        this.toastr.success(`Đã xóa phòng trọ ${this.info.id}`, 'Thành công !');
      })
      .catch(err => {
        this.closePopup();
        console.error(err);
        this.toastr.error(`Xóa thất bại phòng trọ ${this.info.id}`, 'Xảy ra lỗi !');
      });
  }

  acceptPT() {
    console.log(this.info.id);
    this.ptService.xetduyetPT(this.info.id, 1)
      .then(result => {
        this.closePopup();
        this.toastr.success('Đã duyệt tất cả phòng trọ', 'Thành công !');
      })
      .catch(err => {
        this.closePopup();
        console.error(err);
        this.toastr.error(`Duyệt thất bại`, 'Xảy ra lỗi !');
      });
  }

  denyPT() {
    console.log(this.info.id);
    this.ptService.xetduyetPT(this.info.id, -1)
      .then(result => {
        this.closePopup();
        this.toastr.success('Đã hủy chấp nhận phòng trọ', 'Thành công !');
      })
      .catch(err => {
        this.closePopup();
        console.error(err);
        this.toastr.error(`Hủy chấp nhận thất bại`, 'Xảy ra lỗi !');
      });
  }

}
