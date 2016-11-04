import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Phongtro } from '../../models/phongtro';
import { User } from '../../models/user';
import { PhongtroService } from '../../services/phongtro.service';
import { UserService } from '../../services/user.service';

let Constants = require('../../resources/constants');

@Component({
  selector: 'app-create-phongtro',
  templateUrl: './create-phongtro.component.html',
  styleUrls: ['./create-phongtro.component.css']
})
export class CreatePhongtroComponent {

  private hasBaseDropZoneOver: boolean = false;
  private options: any;
  private previewData: any;
  private uploadEvents: EventEmitter<any>;
  private user: User;
  private complexForm: FormGroup;
  private initGioitinh: boolean;
  private initWifi: boolean;
  private initChu: boolean;
  private hasHinhanh: boolean;
  private errorMsg: Array<Object>;
  private formInfo: string;
  private ptEdit: Phongtro;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private ptService: PhongtroService, private userService: UserService) {
    // this.init();
    this.fakeInit();
  }

  ngOnInit() {
  }

  init() {

    this.route.params.forEach((params: Params) => {
      this.formInfo = params['formInfo'];
      if (this.formInfo === 'edit') {
        this.ptEdit = this.ptService.currentPT;
      }
    });
    this.user = this.userService.user;
    if (!this.user) {
      this.router.navigate(['/home']);
    }

    if (this.ptEdit && this.formInfo === 'edit') {
      this.options = {
        url: 'http://localhost:8080/trosv/api/phongtro/hinhanh',
        filterExtensions: true,
        allowedExtensions: ['jpg', 'jpeg', 'png'],
        data: { id: this.ptEdit.id },
        autoUpload: false,
        previewUrl: true
      };
      let ptDiachi = this.ptEdit.diachi.split(', ');
      this.complexForm = this.fb.group({
        'sonha': [ptDiachi[0], Validators.required],
        'phuong': [ptDiachi[1], Validators.required],
        'quan': [ptDiachi[2], Validators.required],
        'tp': [ptDiachi[3], Validators.required],
        'giatien': [this.ptEdit.giatien, Validators.required],
        'tiencoc': this.ptEdit.tiencoc,
        'dientich': [this.ptEdit.dientich, Validators.required],
        'hinhanh': '',
        'songuoi': [this.ptEdit.songuoi, Validators.required],
        'truong': this.ptEdit.truong,
        'nganh': this.ptEdit.nganh,
        'khoa': this.ptEdit.khoa,
        'gioitinh': this.ptEdit.gioitinh,
        'wifi': this.ptEdit.wifi,
        'chu': this.ptEdit.chu,
        'ghichu': this.ptEdit.ghichu,
        'userID': this.user.id
      });

      if (this.ptEdit.gioitinh === 'nam') {
        this.initGioitinh = true;
      } else {
        this.initGioitinh = false;
      }
      if (this.ptEdit.wifi === 1) {
        this.initWifi = true;
      } else {
        this.initWifi = false;
      }
      if (this.ptEdit.chu === 1) {
        this.initChu = true;
      } else {
        this.initChu = false;
      }
      this.hasHinhanh = true;
      this.errorMsg = [{
        msg: ''
      }];
      this.uploadEvents = new EventEmitter();
      this.previewData = this.ptEdit.hinhanh;
    } else {

      this.options = {
        url: 'http://localhost:8080/trosv/api/phongtro/hinhanh',
        filterExtensions: true,
        allowedExtensions: ['jpg', 'jpeg', 'png'],
        data: { id: 0 },
        autoUpload: false,
        previewUrl: true
      };
      this.complexForm = this.fb.group({
        'sonha': ['', Validators.required],
        'phuong': ['', Validators.required],
        'quan': ['', Validators.required],
        'tp': ['', Validators.required],
        'giatien': ['', Validators.required],
        'tiencoc': '',
        'dientich': ['', Validators.required],
        'hinhanh': '',
        'songuoi': ['', Validators.required],
        'truong': '',
        'nganh': '',
        'khoa': '',
        'gioitinh': 'nam',
        'wifi': 1,
        'chu': 1,
        'ghichu': '',
        'userID': this.user.id
      });

      this.hasHinhanh = true;
      this.errorMsg = [{
        msg: ''
      }];
      this.initGioitinh = true;
      this.initWifi = true;
      this.initChu = true;

      this.uploadEvents = new EventEmitter();
      this.previewData = null;
    }
  }

  submitForm(value: any) {
    let currentDate = Constants.getCurrentDate();

    value.wifi = +value.wifi;
    value.chu = +value.chu;
    value.tiencoc = +value.tiencoc
    value.ngaydang = currentDate;
    value.sonha = value.sonha.toLowerCase();
    value.phuong = value.phuong.toLowerCase();
    value.quan = value.quan.toLowerCase();
    value.tp = value.tp.toLowerCase();
    value.diachi = value.sonha + ',phường ' + value.phuong + ', quận ' + value.quan + ', thành phố ' + value.tp;
    value.truong = value.truong.toLowerCase();
    value.nganh = value.nganh.toLowerCase();
    delete value.sonha;
    delete value.phuong;
    delete value.quan;
    delete value.tp;
    if (!this.previewData) {
      this.hasHinhanh = false;
      this.errorMsg = [{
        msg: 'Bạn chưa thêm ảnh cho phòng trọ.'
      }];
    } else {
      this.hasHinhanh = true;
    }
    if(this.hasHinhanh) {
      console.log(value);
      // this.ptService.themPhongtro(value).then(resp => {
      //   this.options.data.id = resp.id;
      //   this.startUpload();
      //   setTimeout(() => {
      //     this.router.navigate(['/phongtro/detail', resp.id]);
      //   }, 3000);
      // });
    }
  }

  closeAlert() {
    this.errorMsg.splice(0, 1);
  }

  handlePreviewData(data: any): void {
    this.previewData = data;
  }

  startUpload() {
    this.uploadEvents.emit('startUpload');
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  deleteImage(): void {
    this.previewData = null;
    this.hasBaseDropZoneOver = false;
  }

  fakeInit() {

    this.route.params.forEach((params: Params) => {
      this.formInfo = params['formInfo'];
      if(this.formInfo === 'edit') {
        this.ptEdit = this.ptService.currentPT;
      }
    });
    this.user = Constants.fakeUser;

    if (this.ptEdit && this.formInfo === 'edit') {
      this.options = {
        url: 'http://localhost:8080/trosv/api/phongtro/hinhanh',
        filterExtensions: true,
        allowedExtensions: ['jpg', 'jpeg', 'png'],
        data: { id: this.ptEdit.id },
        autoUpload: false,
        previewUrl: true
      };
      let ptDiachi = this.ptEdit.diachi.split(', ');
      this.complexForm = this.fb.group({
        'sonha': [ptDiachi[0], Validators.required],
        'phuong': [ptDiachi[1], Validators.required],
        'quan': [ptDiachi[2], Validators.required],
        'tp': [ptDiachi[3], Validators.required],
        'giatien': [this.ptEdit.giatien, Validators.required],
        'tiencoc': this.ptEdit.tiencoc,
        'dientich': [this.ptEdit.dientich, Validators.required],
        'hinhanh': '',
        'songuoi': [this.ptEdit.songuoi, Validators.required],
        'truong': this.ptEdit.truong,
        'nganh': this.ptEdit.nganh,
        'khoa': this.ptEdit.khoa,
        'gioitinh': this.ptEdit.gioitinh,
        'wifi': this.ptEdit.wifi,
        'chu': this.ptEdit.chu,
        'ghichu': this.ptEdit.ghichu,
        'userID': this.user.id
      });

      if(this.ptEdit.gioitinh === 'nam') {
        this.initGioitinh = true;
      } else {
        this.initGioitinh = false;
      }
      if (this.ptEdit.wifi === 1) {
        this.initWifi = true;
      } else {
        this.initWifi = false;
      }
      if (this.ptEdit.chu === 1) {
        this.initChu = true;
      } else {
        this.initChu = false;
      }
      this.hasHinhanh = true;
      this.errorMsg = [{
        msg: ''
      }];
      this.uploadEvents = new EventEmitter();
      this.previewData = this.ptEdit.hinhanh;
    } else {
      this.options = {
        url: 'http://localhost:8080/trosv/api/phongtro/hinhanh',
        filterExtensions: true,
        allowedExtensions: ['jpg', 'jpeg', 'png'],
        data: { id: 0 },
        autoUpload: false,
        previewUrl: true
      };
      this.complexForm = this.fb.group({
        'sonha': ['', Validators.required],
        'phuong': ['', Validators.required],
        'quan': ['', Validators.required],
        'tp': ['', Validators.required],
        'giatien': ['', Validators.required],
        'tiencoc': '',
        'dientich': ['', Validators.required],
        'hinhanh': '',
        'songuoi': ['', Validators.required],
        'truong': '',
        'nganh': '',
        'khoa': '',
        'gioitinh': 'nam',
        'wifi': 1,
        'chu': 1,
        'ghichu': '',
        'userID': this.user.id
      });
      this.initGioitinh = true;
      this.initWifi = true;
      this.initChu = true;
      this.hasHinhanh = true;
      this.errorMsg = [{
        msg: ''
      }];
      this.uploadEvents = new EventEmitter();
      this.previewData = null;
    }


  }

}
