import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder, private router: Router, private ptService: PhongtroService, private userService: UserService) {
    // this.init();
    this.fakeInit();
  }

  ngOnInit() {
  }

  init() {

    this.user = this.userService.user;
    if (!this.user) {
      this.router.navigate(['/home']);
    }
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

    this.uploadEvents = new EventEmitter();
    this.previewData = null;
  }

  submitForm(value: any) {
    let currentDate = Constants.getCurrentDate();

    value.wifi = +value.wifi;
    value.chu = +value.chu;
    value.tiencoc = +value.tiencoc
    value.ngaydang = currentDate;
    value.sonha = value.sonha.toLowerCase();
    value.phuong = value.sonha.toLowerCase();
    value.quan = value.sonha.toLowerCase();
    value.tp = value.sonha.toLowerCase();
    value.diachi = value.sonha + ',phường ' + value.phuong + ', quận ' + value.quan + ', thành phố ' + value.tp;
    value.truong = value.truong.toLowerCase();
    value.nganh = value.nganh.toLowerCase();
    console.log(value);
    // this.ptService.themPhongtro(value).then(resp => {
    //   this.options.data.id = resp.id;
    //   this.startUpload();
    //   setTimeout(() => {
    //     this.router.navigate(['/phongtro/detail', resp.id]);
    //   }, 3000);
    // });
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
    this.user = Constants.fakeUser;
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

    this.uploadEvents = new EventEmitter();
    this.previewData = null;
  }

}
