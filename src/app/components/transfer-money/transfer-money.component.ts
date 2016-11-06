import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { PhongtroService } from '../../services/phongtro.service';
import { UserService } from '../../services/user.service';
import { NganhangService } from '../../services/nganhang.service';
import { GiaodichService } from '../../services/giaodich.service';
import { User } from '../../models/user';
import { Phongtro } from '../../models/phongtro';
import { Nganhang } from '../../models/nganhang';
import { Giaodich } from '../../models/giaodich';

let Constants = require('../../resources/constants');

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit {

  @ViewChild('errorModal') errorModal: ModalDirective;
  private ngh_gui: Nganhang;
  private ngh_nhan: Nganhang;
  private phongtro: Phongtro;
  private id_gui;
  private hoten_gui;
  private hoten_nhan;
  private tiencoc;
  private id_nhan;
  private successMsg: string = '';

  constructor(private fb: FormBuilder, private router: Router, private ptService: PhongtroService, private userService: UserService, private nghService: NganhangService, private gdService: GiaodichService) {
    // this.fakeInit();
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.ngh_gui = this.nghService.currentNgh;
    this.phongtro = this.ptService.currentPT;
    this.id_gui = this.ngh_gui.id;
    this.hoten_gui = this.ngh_gui.hoten;
    this.tiencoc = this.phongtro.tiencoc;
    this.nghService.layThongtinNganhangTheoId(this.phongtro.nganhangID).then((tk: Nganhang) => {
      this.ngh_nhan = tk;
      this.id_nhan = this.ngh_nhan.id;
      this.hoten_nhan = this.ngh_nhan.hoten;
    });
  }

  submitForm() {
    let date = new Date();
    let tmpMonth = date.getMonth() + 1;
    let month = '' + tmpMonth;
    if (tmpMonth < 10) {
      month = '0' + tmpMonth;
    }
    let currentDate = Constants.getCurrentDate();

    let gd: Giaodich = {
      nganhangID_gui: this.ngh_gui.id,
      nganhangID_nhan: this.ngh_nhan.id,
      ngay: currentDate,
      tien: this.phongtro.tiencoc
    }
    this.gdService.chuyenTien(this.phongtro.id, gd).then(resp => {
      this.successMsg = 'Đặt cọc thành công !';
      setTimeout(() => {
        this.goBack();
      }, 5000);
    }).catch(error => {
      this.errorModal.show();
    });
  }

  goBack() {
    this.router.navigate([`/phongtro/detail/${this.phongtro.id}`]);
  }

  fakeInit() {
    this.phongtro = Constants.fakePt;
    this.ngh_gui = Constants.fakeNgh;
    this.ngh_nhan = {
      cmnd: '111222333',
      diachi: '123 abc',
      hoten: 'abc',
      id: '2248273829182',
      password: '123454',
      sodt: '0123456789',
      tien: 0,
      username: 'bbb'
    };
    this.id_gui = this.ngh_gui.id;
    this.hoten_gui = this.ngh_gui.hoten;
    this.hoten_nhan = this.ngh_nhan.hoten;
    this.tiencoc = this.phongtro.tiencoc;
    this.id_nhan = this.ngh_nhan.id;
  }

}
