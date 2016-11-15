import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  private typeTiencoc: number;
  private successMsg: string = '';
  private ngay;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private ptService: PhongtroService, private userService: UserService, private nghService: NganhangService, private gdService: GiaodichService) {
    // this.fakeInit();
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.ngay = Constants.getCurrentDate();
    this.route.params.forEach((params: Params) => {
      this.typeTiencoc = +params['typeTiencoc'];
    });

    this.ngh_gui = this.nghService.currentNgh;
    this.phongtro = this.ptService.currentPT;
    this.nghService.layThongtinNganhangTheoId(this.phongtro.nganhangID).then((tk: Nganhang) => {
      this.ngh_nhan = tk;
    })
    .catch(err => {
      console.log(err);
      this.router.navigate(['/404']);
    });
  }

  submitForm() {
    let tiencoc;
    if(this.typeTiencoc === 0) {
      tiencoc = this.phongtro.tiencoc;
    } else {
      tiencoc = this.phongtro.tiencocTheoNguoi;
    }
    let gd: Giaodich = {
      nganhangID_gui: this.ngh_gui.id,
      nganhangID_nhan: this.ngh_nhan.id,
      phongtroID: this.phongtro.id,
      ngay: this.ngay,
      tien: tiencoc
    }
    this.gdService.chuyenTien(gd).then(resp => {
      this.successMsg = 'Đặt cọc thành công !';
      window.scrollTo(0, 0);
      setTimeout(() => {
        this.goBack();
      }, 2000);
    }).catch(error => {
      this.errorModal.show();
    });
  }

  goBack() {
    this.router.navigate([`/phongtro/detail/${this.phongtro.id}`]);
  }

  fakeInit() {
    this.typeTiencoc = 0;
    this.ngay = Constants.getCurrentDate();
    this.phongtro = Constants.fakePT;
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
  }
}
