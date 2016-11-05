import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PhongtroService } from '../../services/phongtro.service';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Phongtro } from '../../models/phongtro';

@Component({
  selector: 'app-phongtro-user',
  templateUrl: './phongtro-user.component.html',
  styleUrls: ['./phongtro-user.component.css']
})
export class PhongtroUserComponent implements OnInit {

  private listPT: Array<Phongtro> = [];
  private ptXoa: any;
  @ViewChild('confirmModal') confirmModal: ModalDirective;

  constructor(private userService: UserService, private ptService: PhongtroService, private router: Router) {
    this.init();
    // this.fakeInit();
  }

  ngOnInit() {
  }

  init() {
    if(this.userService.user) {
      this.ptService.layPhongtroUser(this.userService.user.id)
        .then(listPT => {
          this.listPT = listPT;
        })
        .catch(err => {
          console.error(err);
          this.listPT = [];
        });
    } else {
      this.userService.checkLoggedIn.subscribe(result => {
        if (result) {
          this.ptService.layPhongtroUser(this.userService.user.id)
            .then(listPT => {
              this.listPT = listPT;
            })
            .catch(err => {
              console.error(err);
              this.listPT = [];
            });
        }
      });
    }

  }

  editPT(pt) {
    this.ptService.currentPT = pt;
    this.router.navigate(['/phongtro/create', {formInfo: 'edit'}]);
  }

  showConfirm(pt) {
    console.log(pt);
    this.ptXoa = pt;
    this.confirmModal.show();
  }

  xoaPT() {
    console.log(this.ptXoa.id);
    // this.listPT.forEach((el, index) => {
    //   if (el.id === this.ptXoa.id) {
    //     this.listPT.splice(index, 1);
    //   }
    // });

    this.ptService.xoaPhongtro(this.userService.user.id, this.ptXoa.id)
      .then(listPT => {
        this.listPT = listPT;
      });
  }

  fakeInit() {
    this.listPT = [
      {
        id: 1,
        hinhanh: 'assets/img/index-08.jpg',
        diachi: '1236 abc, Phường 15, Quận Gò Vấp, Thành phố hồ chí minh',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nữ',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 5000000,
        chu: 1,
        ghichu: '',
        khoa: '',
        nganh: '',
        tiencoc: 1500000,
        userID: 1
      },
      {
        id: 2,
        hinhanh: 'assets/img/index-09.jpg',
        diachi: '1234 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nam',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 2000000,
        chu: 1,
        ghichu: '',
        khoa: '',
        nganh: '',
        tiencoc: 1500000,
        userID: 1
      },
      {
        id: 3,
        hinhanh: 'assets/img/index-10.jpg',
        diachi: '1235 abc P.4 Quận Gò Vấp',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nữ',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 5000000,
        chu: 1,
        ghichu: '',
        khoa: '',
        nganh: '',
        tiencoc: 1500000,
        userID: 1
      },
      {
        id: 4,
        hinhanh: 'assets/img/index-07.jpg',
        diachi: '123 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nữ',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 2000000,
        chu: 1,
        ghichu: '',
        khoa: '',
        nganh: '',
        tiencoc: 1500000,
        userID: 1,
      },
      {
        id: 5,
        hinhanh: 'assets/img/index-08.jpg',
        diachi: '1236 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nam',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 5000000,
        chu: 1,
        ghichu: '',
        khoa: '',
        nganh: '',
        tiencoc: 1500000,
        userID: 1
      },
      {
        id: 6,
        hinhanh: 'assets/img/index-09.jpg',
        diachi: '1234 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nam',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 2000000,
        chu: 1,
        ghichu: '',
        khoa: '',
        nganh: '',
        tiencoc: 1500000,
        userID: 1
      },
      {
        id: 7,
        hinhanh: 'assets/img/index-10.jpg',
        diachi: '1235 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nữ',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 5000000,
        chu: 1,
        ghichu: '',
        khoa: '',
        nganh: '',
        tiencoc: 1500000,
        userID: 1
      }
    ];
  }

}
