import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Phongtro } from '../../models/phongtro';
import { User } from '../../models/user';
import { PhongtroService } from '../../services/phongtro.service';
import { UserService } from '../../services/user.service';
import { TienichService } from '../../services/tienich.service';

let Constants = require('../../resources/constants');

@Component({
  selector: 'app-create-phongtro',
  templateUrl: './create-phongtro.component.html',
  styleUrls: ['./create-phongtro.component.css']
})
export class CreatePhongtroComponent implements OnInit {

  // @ViewChild('cropImage') cropImage: ModalDirective;
  // @ViewChild('cropper') cropper: ImageCropperComponent;
  private hasBaseDropZoneOver: boolean = false;
  private options: any;
  private previewData: any;
  private uploadEvents: EventEmitter<any>;
  private user: User;
  private complexForm: FormGroup;
  private initLoaiPhong: number;
  private initGioitinh: string;
  private hasGiatien: boolean;
  private hasDientich: boolean;
  private hasSonguoi: boolean;
  private hasHinhanh: boolean;
  private hasTkNgh: boolean;
  private editSuccess: boolean;
  private typeEditSuccess: string = 'success';
  private successMsg: Array<Object>;
  private errorMsgGiatien: Array<Object>;
  private errorMsg: Array<Object>;
  private errorMsgNgh: Array<Object>;
  private formInfo: string;
  private ptEdit: Phongtro;
  private lat: number;
  private infoWindowOpen: boolean;
  private lng: number;
  private zoom: number = 18;
  private ptDiachi;
  private formValue;
  private listTruong;
  private truong: string = '';
  private listNganh;
  private nganh: string = '';
  private listKhoa;
  private khoa: string = '';
  private tienichTags: Array<string>;
  private listTienich: Array<string>;
  private listAllTienich: Array<any>;
  // private data1: any;
  // private cropperSettings1: CropperSettings;

  constructor(private route: ActivatedRoute, private http: Http, private fb: FormBuilder, private router: Router, private ptService: PhongtroService, private userService: UserService, private tienichService: TienichService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.init();
    });
    this.userService.checkLoggedIn.subscribe(result => {
      if (!result) {
        this.router.navigate(['/home']);
      }
    });
  }

  getLatLng(diachi) {
    let url = `${Constants.geocodeUrl}${diachi},Việt Nam`;
    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(resp => {
        let location = resp.results[0].geometry.location;
        this.lat = location.lat;
        this.lng = location.lng;
        this.infoWindowOpen = true;
      });
  }

  dragEnd(e: any) {
    if(!this.infoWindowOpen) {
      this.infoWindowOpen = false;
    }
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
    // this.cropperSettings1 = new CropperSettings();
    // this.cropperSettings1.width = 850;
    // this.cropperSettings1.height = 450;

    // this.cropperSettings1.canvasWidth = 868;
    // this.cropperSettings1.canvasHeight = 450;

    // this.cropperSettings1.minWidth = 850;
    // this.cropperSettings1.minHeight = 450;

    // this.cropperSettings1.rounded = false;
    // this.cropperSettings1.noFileInput = true;

    // this.cropperSettings1.cropperDrawSettings.strokeColor = '#fcdd44';
    // this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

    // this.data1 = {};
    this.listTienich = [];
    this.tienichTags = [];
    this.infoWindowOpen = false;
    this.ptService.layDulieuTimkiemPhongtro()
      .then(result => {
        if (result === 'success') {
          this.listTruong = this.ptService.listTruong;
          this.listNganh = this.ptService.listNganh;
          this.listKhoa = this.ptService.listKhoa;
        }
      });
    this.ptDiachi = {
      sonha: '',
      phuong: '',
      quan: '',
      tp: ''
    };
    this.route.params.forEach((params: Params) => {
      this.formInfo = params['formInfo'];
      if (this.formInfo === 'edit') {
        this.ptEdit = this.ptService.currentPT;
        this.getLatLng(this.ptEdit.diachi);
      }
    });
    this.user = this.userService.user;
    if (!this.user) {
      this.router.navigate(['/home']);
    }
    this.hasGiatien = true;
    this.hasDientich = true;
    this.hasSonguoi = true;
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
      this.tienichService.layTatcaTienich()
        .then(result => {
          this.listAllTienich = result;
          for (let i = 0; i < result.length; i++) {
            if(this.ptEdit.tienich.findIndex(item => item.ten === result[i].ten) > -1) {
              this.tienichTags.push(result[i].ten);
            } else {
              this.listTienich.push(result[i].ten);
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
      this.complexForm = this.fb.group({
        'loaiPhong': this.ptEdit.loaiPhong,
        'sonha': [sonha, Validators.required],
        'phuong': [phuong, Validators.required],
        'quan': [quan, Validators.required],
        'tp': [tp, Validators.required],
        'giatien': [this.ptEdit.giatien, Validators.compose([Validators.required, Validators.minLength(9)])],
        'giatienTheoNguoi': [this.ptEdit.giatienTheoNguoi, Validators.compose([Validators.required, Validators.minLength(9)])],
        'tiencoc': this.ptEdit.tiencoc,
        'tiencocTheoNguoi': this.ptEdit.tiencocTheoNguoi,
        'dientich': [this.ptEdit.dientich, Validators.required],
        'sophong': [this.ptEdit.sophong, Validators.required],
        'nganhangID': this.ptEdit.nganhangID,
        'hinhanh': '',
        'truong': this.ptEdit.truong,
        'nganh': this.ptEdit.nganh,
        'khoa': this.ptEdit.khoa,
        'gioitinh': this.ptEdit.gioitinh,
        'tienich': '',
        'ghichu': this.ptEdit.ghichu,
        'userID': this.user.id
      });
      this.truong = this.ptEdit.truong;
      this.nganh = this.ptEdit.nganh;
      this.khoa = this.ptEdit.khoa;
      this.formValue = {
        giatien: this.ptEdit.giatien,
        giatienTheoNguoi: this.ptEdit.giatienTheoNguoi,
        tiencoc: this.ptEdit.tiencoc,
        tiencocTheoNguoi: this.ptEdit.tiencocTheoNguoi,
        dientich: this.ptEdit.dientich,
        sophong: this.ptEdit.sophong
      };
      this.initLoaiPhong = this.ptEdit.loaiPhong;
      this.initGioitinh = this.ptEdit.gioitinh;

      this.previewData = this.ptEdit.hinhanh;
      this.fileChangeListener(this.ptEdit.hinhanh);
    } else {
      this.tienichService.layTatcaTienich()
        .then(result => {
          this.listAllTienich = result;
          for (let i = 0; i < result.length; i++) {
            this.listTienich.push(result[i].ten);
          }
        })
        .catch(err => {
          console.error(err);
        });
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
        'giatien': [0, Validators.compose([Validators.required, Validators.minLength(9)])],
        'giatienTheoNguoi': [0, Validators.compose([Validators.required, Validators.minLength(9)])],
        'tiencoc': 0,
        'tiencocTheoNguoi': 0,
        'dientich': [0, Validators.required],
        'sophong': [0, Validators.required],
        'nganhangID': '',
        'hinhanh': '',
        'truong': '',
        'nganh': '',
        'khoa': '',
        'gioitinh': '',
        'tienich': '',
        'ghichu': '',
        'userID': this.user.id
      });
      this.formValue = {
        giatien: 0,
        giatienTheoNguoi: 0,
        tiencoc: 0,
        tiencocTheoNguoi: 0,
        dientich: 0,
        sophong: 0
      };
      this.initLoaiPhong = 2;
      this.initGioitinh = '';

      this.previewData = null;
    }
  }

  addTienich(tienich, e) {
    this.listTienich.splice(this.listTienich.indexOf(tienich), 1);
    if(e === 'clickEvent') {
      this.tienichTags.push(tienich);
    }
  }

  removeTienich(e: any) {
    this.listTienich.push(e);
  }

  submitForm(value: any) {
    value.loaiPhong = +value.loaiPhong;
    value.tiencoc = +this.formValue.tiencoc;
    value.giatien = +this.formValue.giatien;
    value.tiencocTheoNguoi = +this.formValue.tiencocTheoNguoi;
    value.giatienTheoNguoi = +this.formValue.giatienTheoNguoi;
    value.dientich = +this.formValue.dientich;
    value.sophong = +this.formValue.sophong;
    if (!this.previewData) {
      this.hasHinhanh = false;
      this.errorMsg = [{
        msg: 'Bạn chưa thêm ảnh cho phòng trọ'
      }];
      window.scrollTo(0, 300);
    } else {
      this.hasHinhanh = true;
    }
    if (value.sophong === 0) {
      this.hasSonguoi = false;
      this.hasDientich = true;
      this.hasGiatien = true;
      this.editSuccess = true;
      this.typeEditSuccess = 'danger';
      this.successMsg = [{
        msg: 'Bạn phải nhập số người cần tìm'
      }];
      window.scrollTo(0, 300);
    } else {
      this.hasSonguoi = true;
    }
    if (value.dientich === 0) {
      this.hasDientich = false;
      this.hasGiatien = true;
      this.hasSonguoi = true;
      this.editSuccess = true;
      this.typeEditSuccess = 'danger';
      this.successMsg = [{
        msg: 'Bạn phải nhập diện tích'
      }];
      window.scrollTo(0, 300);
    } else {
      this.hasDientich = true;
    }
    if (value.loaiPhong === 2) {
      if(value.giatien === 0 || value.giatienTheoNguoi === 0) {
        this.hasGiatien = false;
        this.hasDientich = true;
        this.hasSonguoi = true;
        this.editSuccess = true;
        this.typeEditSuccess = 'danger';
        if(value.giatien === 0) {
          this.successMsg[0] = {
            msg: 'Bạn phải nhập giá thuê nguyên phòng'
          };
        } else {
          this.successMsg[0] = undefined;
        }
        if(value.giatienTheoNguoi === 0) {
          this.successMsg[1] = {
            msg: 'Bạn phải nhập giá thuê từng người'
          }
        } else {
          this.successMsg[1] = undefined;
        }
        window.scrollTo(0, 300);
      } else {
        this.hasGiatien = true;
      }
      if (value.tiencoc !== 0 || value.tiencocTheoNguoi !== 0) {
        if (value.nganhangID === '') {
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
    } else if(value.loaiPhong === 1) {
      value.giatien = 0;
      if(value.giatienTheoNguoi === 0) {
        this.hasGiatien = false;
        this.hasDientich = true;
        this.hasSonguoi = true;
        this.editSuccess = true;
        this.typeEditSuccess = 'danger';
        this.successMsg = [{
          msg: 'Bạn phải nhập giá thuê từng người'
        }];
        window.scrollTo(0, 300);
      } else {
        this.hasGiatien = true;
      }
      value.tiencoc = 0;
      if (value.tiencocTheoNguoi !== 0) {
        if (value.nganhangID === '') {
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
    } else {
      value.giatienTheoNguoi = 0;
      if (value.giatien === 0) {
        this.hasGiatien = false;
        this.hasDientich = true;
        this.hasSonguoi = true;
        this.editSuccess = true;
        this.typeEditSuccess = 'danger';
        this.successMsg = [{
          msg: 'Bạn phải nhập giá thuê nguyên phòng'
        }];
        window.scrollTo(0, 300);
      } else {
        this.hasGiatien = true;
      }
      value.tiencocTheoNguoi = 0;
      if (value.tiencoc !== 0) {
        if (value.nganhangID === '') {
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
    }

    if(this.hasHinhanh && this.hasTkNgh && this.hasGiatien && this.hasDientich && this.hasSonguoi) {
      let currentDate = Constants.getCurrentDate();
      value.ngaydang = currentDate;
      value.sonha = value.sonha.toLowerCase();
      value.phuong = value.phuong.toLowerCase();
      value.quan = value.quan.toLowerCase();
      value.tp = value.tp.toLowerCase();
      value.truong = this.truong.toLowerCase();
      value.nganh = this.nganh.toLowerCase();
      value.khoa = this.khoa;

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
      for (let i = 0; i < this.listAllTienich.length; i++) {
        let item = this.listAllTienich[i];
        if (this.tienichTags.indexOf(item.ten) === -1) {
          this.listAllTienich.splice(this.listAllTienich.indexOf(item), 1);
          i--;
        }
      }
      value.tienich = this.listAllTienich;

      if(this.formInfo === 'edit') {
        this.ptService.capnhatPhongtro(this.ptEdit.id, value)
          .then(resp => {
            this.editSuccess = true;
            this.options.data.id = this.ptEdit.id;
            this.startUpload();
            this.typeEditSuccess = 'success';
            this.successMsg = [{
              msg: 'Cập nhật phòng trọ thành công !'
            }, {
              msg: 'Bạn sẽ được chuyển tới phòng trọ này !'
            }];
            window.scrollTo(0, 300);
            setTimeout(() => {
              this.router.navigate(['/phongtro/detail', resp.id]);
            }, 3000);
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
            }, 3000);
          });
      } else {
        this.ptService.themPhongtro(value)
          .then(resp => {
            this.editSuccess = true;
            this.options.data.id = resp.id;
            this.startUpload();
            this.typeEditSuccess = 'success';
            this.successMsg = [{
              msg: 'Tạo phòng trọ thành công'
            }, {
              msg: 'Chúng tôi sẽ thông báo đến bạn sau 1 ngày'
            }];
            window.scrollTo(0, 300);
            setTimeout(() => {
              this.router.navigate(['/phongtro/user']);
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
            }, 3000);
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

  fileChangeListener($event: any) {
    // console.log($event);
    // let image: any = new Image();
    // if($event.target) {
    //   let file: File = $event.target.files[0];
    //   let myReader: FileReader = new FileReader();
    //   let that = this;
    //   myReader.onloadend = function(loadEvent: any) {
    //     image.src = loadEvent.target.result;
    //     that.cropper.setImage(image);
    //   };
    //   myReader.readAsDataURL(file);
    // } else {
    //   image.crossOrigin = "Anonymous";
    //   image.src = $event;
    //   this.cropper.setImage(image);
    // }
  }

  // cropDone() {
  //   console.log(this.data1);
  //   this.previewData = this.data1.image;
  //   this.cropImage.hide();
  // }

  handlePreviewData(data: any): void {
    this.previewData = data;
    // this.cropImage.show();
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

  changeTien(e: any, type: string) {
    if (e === '' || e === null) {
      this.formValue[type] = 0;
    } else {
      for (let i = 0; i < e.length; ++i) {
        if (e[i] === ',') {
          e = e.slice(0, i) + e.slice(i + 1, e.length);
        }
      }
      if (!isNaN(e)) {
        this.formValue[type] = e;
      }
    }
  }
}
