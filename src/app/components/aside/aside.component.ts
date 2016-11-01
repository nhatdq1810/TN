import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  private deals: Array<any> = [];

  constructor() {
    this.init();
    this.fakeInit();
  }

  ngOnInit() {
  }

  init() {

  }

  fakeInit() {
    this.deals = [
      {
        id: 3,
        hinhanh: 'assets/img/index-03.jpg',
        diachi: '123 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nam',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 2000000
      },
      {
        id: 4,
        hinhanh: 'assets/img/index-04.jpg',
        diachi: '1236 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nam',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 5000000
      },
      {
        id: 5,
        hinhanh: 'assets/img/index-05.jpg',
        diachi: '1234 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nữ',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 2000000
      }
    ];
  }

}
