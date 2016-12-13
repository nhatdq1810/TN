import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { PhongtroService } from '../../../services/phongtro.service';

@Component({
  selector: 'app-detail-popup',
  templateUrl: './detail-popup.component.html',
  styleUrls: ['./detail-popup.component.css']
})
export class DetailPopupComponent implements OnInit {

  @ViewChild('detailPopup') detailPopup: ModalDirective;
  @ViewChild('confirmPopup') confirmPopup: ConfirmPopupComponent;
  @Output() popupClose = new EventEmitter();
  @Input() info: any;
  @Input() showAcceptBtn: boolean;
  @Input() showDenyBtn: boolean;
  @Input() showDetailPTBtn: boolean;
  @Input() showDeleteBtn: boolean;
  private isDelete: boolean;
  private confirmSelectedPT: Array<any> = [];

  constructor(private toastr: ToastsManager, private ptService: PhongtroService) {
  }

  ngOnInit() {
  }

  init() {

  }

  showPopup() {
    this.detailPopup.show();
  }

  closePopup(result) {
    this.popupClose.emit(result);
    this.detailPopup.hide();
  }

  showDetailPT() {
    window.open(`/phongtro/detail/${this.info.id}`);
  }

  confirmPopupClose(e: any) {
    this.closePopup(e);
  }

  deletePT() {
    this.closePopup(false);
    this.confirmSelectedPT = [];
    this.confirmSelectedPT.push(this.info);
    this.isDelete = true;
    this.confirmPopup.showPopup();
    // this.ptService.adminXoaPhongtro(this.info.id, 0)
    //   .then(result => {
    //     this.closePopup(true);
    //     this.toastr.success(`Đã xóa phòng trọ ${this.info.id}`, 'Thành công !');
    //   })
    //   .catch(err => {
    //     this.closePopup(false);
    //     console.error(err);
    //     this.toastr.error(`Xóa thất bại phòng trọ ${this.info.id}`, 'Xảy ra lỗi !');
    //   });
  }

  acceptPT() {
    let tmpArray = [this.info];
    let tmpReason = [];
    this.ptService.xetduyetPT(tmpArray, tmpReason, 1)
      .then(result => {
        this.closePopup(true);
        this.toastr.success(`Đã duyệt phòng trọ ${this.info.id}`, 'Thành công !');
      })
      .catch(err => {
        this.closePopup(false);
        console.error(err);
        this.toastr.error(`Duyệt thất bại phòng trọ ${this.info.id}`, 'Xảy ra lỗi !');
      });
  }

  denyPT() {
    this.closePopup(false);
    this.confirmSelectedPT = [];
    this.confirmSelectedPT.push(this.info);
    this.isDelete = false;
    this.confirmPopup.showPopup();
    // let tmpArray = [this.info.id];
    // this.ptService.xetduyetPT(tmpArray, -1)
    //   .then(result => {
    //     this.closePopup(true);
    //     this.toastr.success(`Đã hủy chấp nhận phòng trọ ${this.info.id}`, 'Thành công !');
    //   })
    //   .catch(err => {
    //     this.closePopup(false);
    //     console.error(err);
    //     this.toastr.error(`Hủy chấp nhận thất bại phòng trọ ${this.info.id}`, 'Xảy ra lỗi !');
    //   });
  }

}
