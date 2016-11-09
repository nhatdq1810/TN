import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-404',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.css']
})
export class Error404Component implements OnInit {

  private deals: Array<any>;

  constructor() {
    this.init();
    // this.fakeInit();
  }

  ngOnInit() {
  }

  init() {

  }

  fakeInit() {
    this.deals = [
      {
        id: 2,
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
        id: 5,
        hinhanh: 'assets/img/index-03.jpg',
        diachi: '123 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nam',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 2000000
      }
    ];
  }

}
