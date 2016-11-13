import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
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
  private initLoaiPhong: number;
  private initGioitinh: string;
  private initWifi: number;
  private initChu: number;
  private hasHinhanh: boolean;
  private hasTkNgh: boolean;
  private editSuccess: boolean;
  private typeEditSuccess: string = 'success';
  private successMsg: Array<Object>;
  private errorMsg: Array<Object>;
  private errorMsgNgh: Array<Object>;
  private formInfo: string;
  private ptEdit: Phongtro;
  private lat: number;
  private lng: number;
  private zoom: number = 15;
  private addrMap: string;
  private ptDiachi;
  private dt;
  private mapInfoOpen: boolean;

  constructor(private route: ActivatedRoute, private http: Http, private fb: FormBuilder, private router: Router, private ptService: PhongtroService, private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.init();
    })
  }

  getLatLng(diachi) {
    this.addrMap = diachi;
    let url = `${Constants.geocodeUrl}${diachi},Việt Nam`;
    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(resp => {
        let location = resp.results[0].geometry.location;
        this.lat = location.lat;
        this.lng = location.lng;
      });
  }

  dragEnd(e: any) {
    let placeUrl = `${Constants.placeUrl}${e.coords.lat},${e.coords.lng}`;
    this.http.get(placeUrl)
      .map(resp => resp.json())
      .subscribe(resp => {
        let tmpLocation = resp.results[0].formatted_address.toLowerCase();
        let location = tmpLocation.split(', ');
        this.ptDiachi = {
          sonha: location[0],
          phuong: location[1],
          quan: location[2],
          tp: location[3]
        };
      });
  }

  onChange(e: any, type: string) {
    if (e !== '') {
      if (type === 'sonha') {
        this.ptDiachi.sonha = e;
      }
      else if (type === 'phuong') {
        this.ptDiachi.phuong = e;
      }
      else if (type === 'quan') {
        this.ptDiachi.quan = e;
      }
      else {
        this.ptDiachi.tp = e;
      }
      let diachi = `${this.ptDiachi.sonha}, ${this.ptDiachi.phuong}, ${this.ptDiachi.quan}, ${this.ptDiachi.tp}`;
      this.getLatLng(diachi);
    }
  }

  init() {
    this.mapInfoOpen = true;
    this.ptDiachi = {
      sonha: '',
      phuong: '',
      quan: '',
      tp: ''
    };
    this.dt = '';
    this.route.params.forEach((params: Params) => {
      this.formInfo = params['formInfo'];
      if (this.formInfo === 'edit') {
        this.zoom = 17;
        this.ptEdit = this.ptService.currentPT;
        this.getLatLng(this.ptEdit.diachi);
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
      this.ptDiachi = {
        sonha: sonha,
        phuong: phuong,
        quan: quan,
        tp: tp
      };
      this.complexForm = this.fb.group({
        'loaiPhong': this.ptEdit.loaiPhong,
        'sonha': [sonha, Validators.required],
        'phuong': [phuong, Validators.required],
        'quan': [quan, Validators.required],
        'tp': [tp, Validators.required],
        'giatien': this.ptEdit.giatien,
        'giatienTheoNguoi': this.ptEdit.giatienTheoNguoi,
        'tiencoc': this.ptEdit.tiencoc,
        'tiencocTheoNguoi': this.ptEdit.tiencocTheoNguoi,
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
      this.dt = this.ptEdit.khoa;
      this.initLoaiPhong = this.ptEdit.loaiPhong;
      this.initGioitinh = this.ptEdit.gioitinh;
      this.initWifi = this.ptEdit.wifi;
      this.initChu = this.ptEdit.chu;
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
      this.getLatLng('Hồ Chí Minh');
      this.options = {
        url: 'http://localhost:8080/trosv/api/phongtro/hinhanh',
        filterExtensions: true,
        allowedExtensions: ['jpg', 'jpeg', 'png'],
        data: { id: 0 },
        autoUpload: false,
        previewUrl: true
      };
      this.complexForm = this.fb.group({
        'loaiPhong': 2,
        'sonha': ['', Validators.required],
        'phuong': ['', Validators.required],
        'quan': ['', Validators.required],
        'tp': ['', Validators.required],
        'giatien': '',
        'giatienTheoNguoi': '',
        'tiencoc': '',
        'tiencocTheoNguoi': '',
        'nganhangID': '',
        'dientich': ['', Validators.required],
        'hinhanh': '',
        'songuoi': ['', Validators.required],
        'truong': '',
        'nganh': '',
        'khoa': '',
        'gioitinh': '',
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
      this.initLoaiPhong = 2;
      this.initGioitinh = '';
      this.initWifi = 1;
      this.initChu = 1;

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
      window.scrollTo(0, 300);
    } else {
      this.hasHinhanh = true;
    }
    if (value.tiencoc !== 0 || value.tiencocTheoNguoi !== 0) {
      if(value.nganhangID === '') {
        this.hasTkNgh = false;
        this.errorMsgNgh = [{
          msg: 'Bạn chưa thêm tài khoản ngân hàng cho việc đặt cọc'
        }];
        window.scrollTo(0, 300);
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
      value.truong = value.truong.toLowerCase();
      value.nganh = value.nganh.toLowerCase();
      let phuong, quan, tp;
      phuong = value.phuong;
      quan = value.quan;
      tp = value.tp;
      if(value.phuong.indexOf('phường') === -1) {
        phuong = `phường ${value.phuong}`;
      }
      if (value.quan.indexOf('quận') === -1) {
        quan = `quận ${value.quan}`;
      }
      if (value.tp.indexOf('thành phố') === -1) {
        tp = `thành phố ${value.tp}`;
      }
      value.diachi = value.sonha + ', ' + phuong + ', ' + quan + ', ' + tp;
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
            window.scrollTo(0, 300);
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
            window.scrollTo(0, 300);
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
            window.scrollTo(0, 300);
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
            window.scrollTo(0, 300);
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
    this.ptDiachi = {
      sonha: '',
      phuong: '',
      quan: '',
      tp: ''
    };
    this.dt = '';
    this.getLatLng('97 Man Thiện, phường Hiệp Phú, Quận 9, Hồ Chí Minh');
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
        'loaiPhong': this.ptEdit.loaiPhong,
        'sonha': [sonha, Validators.required],
        'phuong': [phuong, Validators.required],
        'quan': [quan, Validators.required],
        'tp': [tp, Validators.required],
        'giatien': this.ptEdit.giatien,
        'giatienTheoNguoi': this.ptEdit.giatienTheoNguoi,
        'tiencoc': this.ptEdit.tiencoc,
        'tiencocTheoNguoi': this.ptEdit.tiencocTheoNguoi,
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
      this.dt = this.ptEdit.khoa;
      this.initLoaiPhong = this.ptEdit.loaiPhong;
      this.initGioitinh = this.ptEdit.gioitinh;
      this.initWifi = this.ptEdit.wifi;
      this.initChu = this.ptEdit.chu;
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
        'loaiPhong': 2,
        'sonha': ['', Validators.required],
        'phuong': ['', Validators.required],
        'quan': ['', Validators.required],
        'tp': ['', Validators.required],
        'giatien': '',
        'giatienTheoNguoi': '',
        'tiencoc': '',
        'tiencocTheoNguoi': '',
        'nganhangID': '',
        'dientich': ['', Validators.required],
        'hinhanh': '',
        'songuoi': ['', Validators.required],
        'truong': '',
        'nganh': '',
        'khoa': '',
        'gioitinh': '',
        'wifi': 1,
        'chu': 1,
        'ghichu': '',
        'userID': this.user.id
      });
      this.initLoaiPhong = 2;
      this.initGioitinh = '';
      this.initWifi = 1;
      this.initChu = 1;
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
