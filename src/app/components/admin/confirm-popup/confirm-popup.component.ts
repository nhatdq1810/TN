import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { PhongtroService } from '../../../services/phongtro.service';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent implements OnInit {

  @ViewChild('confirmPopup') confirmPopup: ModalDirective;
  @Output() popupClose = new EventEmitter();
  @Input() info: Array<any>;
  @Input() listUser: Array<any>;
  @Input() isDelete: boolean;
  @Input() isDeny: boolean;
  private reason: Array<string> = [];

  constructor(private toastr: ToastsManager, private ptService: PhongtroService) { }

  ngOnInit() {
  }

  showPopup() {
    this.confirmPopup.show();
  }

  closePopup(result) {
    this.popupClose.emit(result);
    this.confirmPopup.hide();
  }

  deletePT() {
    for (let i = 0; i < this.info.length; i++) {
      this.ptService.adminXoaPhongtro(this.info[i], 0, this.reason[this.info[i].id])
        .then(result => {
          this.toastr.success(`Đã xóa phòng trọ ${this.info[i].id}`, 'Thành công !');
          if(i === this.info.length) {
            this.closePopup(true);
          }
        })
        .catch(err => {
          console.error(err);
          this.closePopup(false);
          this.toastr.error(`Xóa thất bại phòng trọ ${this.info[i].id}`, 'Xảy ra lỗi !');
        });
    }
  }

  denyPT() {
    this.ptService.xetduyetPT(this.info, -1)
      .then(result => {
        this.toastr.success('Đã hủy chấp nhận các phòng trọ', 'Thành công !');
      })
      .catch(err => {
        console.error(err);
        this.toastr.error(`Hủy chấp nhận thất bại các phòng trọ`, 'Xảy ra lỗi !');
      });
  }
}
