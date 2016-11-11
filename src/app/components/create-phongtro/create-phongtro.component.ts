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
  private hasTkNgh: boolean;
  private editSuccess: boolean;
  private typeEditSuccess: string = 'success';
  private successMsg: Array<Object>;
  private errorMsg: Array<Object>;
  private errorMsgNgh: Array<Object>;
  private formInfo: string;
  private ptEdit: Phongtro;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private ptService: PhongtroService, private userService: UserService) {
    this.init();
    // this.fakeInit();
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
      let sonha = ptDiachi[0];
      let phuong = ptDiachi[1].split('phường ')[1];
      let quan = ptDiachi[2].split('quận ')[1];
      let tp = ptDiachi[3].split('thành phố ')[1];
      this.complexForm = this.fb.group({
        'sonha': [sonha, Validators.required],
        'phuong': [phuong, Validators.required],
        'quan': [quan, Validators.required],
        'tp': [tp, Validators.required],
        'giatien': [this.ptEdit.giatien, Validators.required],
        'tiencoc': this.ptEdit.tiencoc,
        'nganhangID': this.ptEdit.nganhangID,
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
      this.hasTkNgh = true;
      this.editSuccess = false;
      this.errorMsg = [{
        msg: ''
      }];
      this.errorMsgNgh = [{
        msg: ''
      }];
      this.successMsg = [{
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
        'nganhangID': '',
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
      this.hasTkNgh = true;
      this.editSuccess = false;
      this.errorMsg = [{
        msg: ''
      }];
      this.errorMsgNgh = [{
        msg: ''
      }];
      this.successMsg = [{
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
    value.tiencoc = +value.tiencoc;
    if (!this.previewData) {
      this.hasHinhanh = false;
      this.errorMsg = [{
        msg: 'Bạn chưa thêm ảnh cho phòng trọ'
      }];
      window.scrollTo(0, 0);
    } else {
      this.hasHinhanh = true;
    }
    if(value.tiencoc !== 0) {
      if(value.nganhangID === '') {
        this.hasTkNgh = false;
        this.errorMsgNgh = [{
          msg: 'Bạn chưa thêm tài khoản ngân hàng cho việc đặt cọc'
        }];
        window.scrollTo(0, 0);
      } else {
        this.hasTkNgh = true;
      }
    } else {
      this.hasTkNgh = true;
    }
    if(this.hasHinhanh && this.hasTkNgh) {
      let currentDate = Constants.getCurrentDate();
      value.wifi = +value.wifi;
      value.chu = +value.chu;
      value.tiencoc = +value.tiencoc
      value.ngaydang = currentDate;
      value.sonha = value.sonha.toLowerCase();
      value.phuong = value.phuong.toLowerCase();
      value.quan = value.quan.toLowerCase();
      value.tp = value.tp.toLowerCase();
      value.diachi = value.sonha + ', phường ' + value.phuong + ', quận ' + value.quan + ', thành phố ' + value.tp;
      if (value.truong !== '') {
        value.truong = value.truong.toLowerCase();
      }
      if (value.nganh !== '') {
        value.nganh = value.nganh.toLowerCase();
      }
      delete value.sonha;
      delete value.phuong;
      delete value.quan;
      delete value.tp;
      if(this.formInfo === 'edit') {
        this.ptService.capnhatPhongtro(this.ptEdit.id, value)
          .then(resp => {
            this.editSuccess = true;
            this.options.data.id = this.ptEdit.id;
            this.startUpload();
            this.successMsg = [{
              msg: 'Cập nhật phòng trọ thành công !'
            }, {
              msg: 'Bạn sẽ được chuyển tới phòng trọ này !'
            }];
            window.scrollTo(0, 0);
            setTimeout(() => {
              this.router.navigate(['/phongtro/detail', resp.id]);
            }, 5000);
          })
          .catch(err => {
            console.error(err);
            this.editSuccess = true;
            this.typeEditSuccess = 'danger';
            this.errorMsgNgh = [{
              msg: 'Cập nhật phòng trọ thất bại ! Có sự cố xảy ra'
            }, {
              msg: 'Bạn sẽ được chuyển về trang chủ. Chúng tôi rất tiếc !'
            }];
            window.scrollTo(0, 0);
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 5000);
          });
      } else {
        this.ptService.themPhongtro(value)
          .then(resp => {
            this.editSuccess = true;
            this.options.data.id = resp.id;
            this.startUpload();
            this.successMsg = [{
              msg: 'Tạo phòng trọ thành công'
            }, {
              msg: 'Bạn sẽ được chuyển tới phòng trọ này !'
            }];
            window.scrollTo(0, 0);
            setTimeout(() => {
              this.router.navigate(['/phongtro/detail', resp.id]);
            }, 5000);
          })
          .catch(err => {
            console.error(err);
            this.editSuccess = true;
            this.typeEditSuccess = 'danger';
            this.errorMsgNgh = [{
              msg: 'Thêm phòng trọ thất bại ! Có sự cố xảy ra'
            }, {
              msg: 'Bạn sẽ được chuyển về trang chủ. Chúng tôi rất tiếc !'
            }];
            window.scrollTo(0, 0);
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 5000);
          });
      }
    }
  }

  closeAlert(typeMsg) {
    if(typeMsg === 'success') {
      this.successMsg.splice(0, 1);
    } else if(typeMsg === 'hinhanh') {
      this.errorMsg.splice(0, 1);
    } else {
      this.errorMsgNgh.splice(0, 1);
    }
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
      let sonha = ptDiachi[0];
      let phuong = ptDiachi[1].split('phường ')[1];
      let quan = ptDiachi[2].split('quận ')[1];
      let tp = ptDiachi[3].split('thành phố ')[1];
      this.complexForm = this.fb.group({
        'sonha': [sonha, Validators.required],
        'phuong': [phuong, Validators.required],
        'quan': [quan, Validators.required],
        'tp': [tp, Validators.required],
        'giatien': [this.ptEdit.giatien, Validators.required],
        'tiencoc': this.ptEdit.tiencoc,
        'nganhangID': this.ptEdit.nganhangID,
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
      this.hasTkNgh = true;
      this.editSuccess = false;
      this.errorMsg = [{
        msg: ''
      }];
      this.errorMsgNgh = [{
        msg: ''
      }];
      this.successMsg = [{
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
        'nganhangID': '',
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
      this.hasTkNgh = true;
      this.editSuccess = false;
      this.errorMsg = [{
        msg: ''
      }];
      this.errorMsgNgh = [{
        msg: ''
      }];
      this.successMsg = [{
        msg: ''
      }];
      this.uploadEvents = new EventEmitter();
      this.previewData = null;
    }
  }
}
