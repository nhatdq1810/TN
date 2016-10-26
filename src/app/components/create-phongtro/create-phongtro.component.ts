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
  private options: Object;
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
      data: { id: 10 },
      autoUpload: false,
      previewUrl: true
    };

    this.uploadEvents = new EventEmitter();
    this.previewData = null;
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
    this.user = {
      diachi: '123 Lê Đức Thọ, Phường 15, Quận Gò Vấp, TP.Hồ Chí Minh',
      dotincay: 1,
      email: 'abc@gmail.com',
      facebook: 'https://www.facebook.com/abcabcabcabcabcabcabcabcabcabc',
      skype: 'sutrix.nhat.dangsutrix.nhat.dangsutrix.nhat.dangsutrix.nhat.dang',
      hoten: 'abc',
      id: 1,
      password: '123456',
      sodt: '0123456789',
      username: 'abcd'
    };
    this.options = {
      url: 'http://localhost:8080/trosv/api/phongtro/hinhanh',
      filterExtensions: true,
      allowedExtensions: ['jpg', 'jpeg', 'png'],
      data: { id: 10 },
      autoUpload: false,
      previewUrl: true
    };

    this.complexForm = this.fb.group({
      'diachi': '',
      'giatien': '',
      'tiencoc': '',
      'dientich': '',
      'songuoi': '',
      'truong': '',
      'nganh': '',
      'khoa': '',
      'gioitinh': '',
      'wifi': 1,
      'chu': 1
    });
    this.initGioitinh = true;

    this.uploadEvents = new EventEmitter();
    this.previewData = null;
  }

}
