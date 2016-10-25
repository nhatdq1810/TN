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

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit {

  @ViewChild('errorModal') errorModal: ModalDirective;
  private complexForm: FormGroup;
  private ngh_gui: Nganhang;
  private ngh_nhan: Nganhang[];
  private phongtro: Phongtro;

  constructor(private fb: FormBuilder, private router: Router, private ptService: PhongtroService, private userService: UserService, private nghService: NganhangService, private gdService: GiaodichService) {
    // this.fakeInit();
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.ngh_gui = this.nghService.currentNgh;
    this.phongtro = this.ptService.currentPT;
    this.nghService.layTkNghTheoUserID(this.phongtro.userID).then((listTk: Nganhang[]) => {
      this.ngh_nhan = listTk;
      this.complexForm = this.fb.group({
        'hoten_gui': new FormControl(this.ngh_gui.hoten, Validators.required),
        'tiencoc': new FormControl(this.phongtro.tiencoc, Validators.required),
        'hoten_nhan': new FormControl(this.ngh_nhan[0].hoten, Validators.required),
        'diachi_nhan': new FormControl(this.ngh_nhan[0].diachi, Validators.required),
        'sodt_nhan': new FormControl(this.ngh_nhan[0].sodt, Validators.required)
      });
    });
  }

  submitForm(value: any) {
    let date = new Date();
    let tmpMonth = date.getMonth() + 1;
    let month = '' + tmpMonth;
    if (tmpMonth < 10) {
      month = '0' + tmpMonth;
    }
    let currentdate = date.getFullYear() + "/"
      + month + "/"
      + date.getDate() + " "
      + date.getHours() + ":"
      + date.getMinutes() + ":"
      + date.getSeconds();
    let gd: Giaodich = {
      nganhangID_gui: this.ngh_gui.id,
      nganhangID_nhan: this.ngh_nhan[0].id,
      ngay: currentdate,
      tien: this.phongtro.tiencoc
    }
    this.gdService.chuyenTien(this.phongtro.id, gd).then(resp => {
      this.router.navigate([`/phongtro/detail/${this.phongtro.id}`]);
    }).catch(error => {
      this.errorModal.show();
    })
  }

  goBack() {
    this.router.navigate([`/phongtro/detail/${this.phongtro.id}`]);
  }

  fakeInit() {
    this.phongtro = {
      chu: 1,
      wifi: 1,
      diachi: '',
      dientich: 10,
      ghichu: '',
      giatien: 2000000,
      gioitinh: 'nam',
      hinhanh: '',
      id: 1,
      khoa: '',
      nganh: '',
      ngaydang: '',
      songuoi: 2,
      tiencoc: 1000000,
      truong: '',
      userID: 1
    };
    this.ngh_gui = {
      cmnd: '123456789',
      diachi: '123 abc',
      hoten: 'abc',
      id: 1,
      password: '123454',
      sodt: '0123456789',
      tien: 0,
      userID: 1,
      username: 'abc'
    };
    this.ngh_nhan = [{
      cmnd: '111222333',
      diachi: '123 abc',
      hoten: 'abc',
      id: 2,
      password: '123454',
      sodt: '0123456789',
      tien: 0,
      userID: 2,
      username: 'bbb'
    }];
    this.complexForm = this.fb.group({
      'hoten_gui': new FormControl(this.ngh_gui.hoten, Validators.required),
      'tiencoc': new FormControl(this.phongtro.tiencoc, Validators.required),
      'hoten_nhan': new FormControl(this.ngh_nhan[0].hoten, Validators.required),
      'diachi_nhan': new FormControl(this.ngh_nhan[0].diachi, Validators.required),
      'sodt_nhan': new FormControl(this.ngh_nhan[0].sodt, Validators.required)
    });
  }

}
