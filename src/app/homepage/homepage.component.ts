/// <reference path="../../../node_modules/@types/jquery/index.d.ts" />

import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { PhongtroService } from '../services/phongtro.service';

declare var $: JQueryStatic;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit, AfterViewInit{

  private model: string;
  private specialDeals: any;
  private hotDeals: any;
  private newDeals: any;
  @ViewChild('flexslider') el: ElementRef;
  @ViewChild('flexslider2') el2: ElementRef;

  constructor(private ptService: PhongtroService) {
    this.specialDeals = [
      {
        id: 1,
        hinhanh: 'assets/img/index-01.jpg',
        diachi: '1234 abc P.15 Quận Gò Vấp',
        giatien: 2000000
      },
      {
        id: 2,
        hinhanh: 'assets/img/index-02.jpg',
        diachi: '1234/22 abc P.15 Quận 9',
        giatien: 5000000
      }
    ];
    this.hotDeals = [
      {
        id: 3,
        hinhanh: 'assets/img/index-03.jpg',
        diachi: '123 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nam',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 2000000
      },
      {
        id: 4,
        hinhanh: 'assets/img/index-04.jpg',
        diachi: '1236 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nam',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 5000000
      },
      {
        id: 5,
        hinhanh: 'assets/img/index-05.jpg',
        diachi: '1234 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nam',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 2000000
      },
      {
        id: 6,
        hinhanh: 'assets/img/index-06.jpg',
        diachi: '1235 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nam',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 5000000
      },
      {
        id: 7,
        hinhanh: 'assets/img/index-06.jpg',
        diachi: '123 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nam',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 2000000
      },
      {
        id: 8,
        hinhanh: 'assets/img/index-05.jpg',
        diachi: '1236 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nam',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 5000000
      },
      {
        id: 9,
        hinhanh: 'assets/img/index-04.jpg',
        diachi: '1234 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nam',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 2000000
      },
      {
        id: 10,
        hinhanh: 'assets/img/index-03.jpg',
        diachi: '1235 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nam',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 5000000
      }
    ];
    this.newDeals = [
      {
        id: 11,
        hinhanh: 'assets/img/index-07.jpg',
        diachi: '123 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nam',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 2000000
      },
      {
        id: 12,
        hinhanh: 'assets/img/index-08.jpg',
        diachi: '1236 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nam',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 5000000
      },
      {
        id: 13,
        hinhanh: 'assets/img/index-09.jpg',
        diachi: '1234 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nam',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 2000000
      },
      {
        id: 14,
        hinhanh: 'assets/img/index-10.jpg',
        diachi: '1235 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nam',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 5000000
      },
      {
        id: 15,
        hinhanh: 'assets/img/index-07.jpg',
        diachi: '123 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nam',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 2000000
      },
      {
        id: 16,
        hinhanh: 'assets/img/index-08.jpg',
        diachi: '1236 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nam',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 5000000
      },
      {
        id: 17,
        hinhanh: 'assets/img/index-09.jpg',
        diachi: '1234 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nam',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 2000000
      },
      {
        id: 18,
        hinhanh: 'assets/img/index-10.jpg',
        diachi: '1235 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nam',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 5000000
      }
    ];
  }

  ngOnInit() {

    // this.ptService.layPhongtroMoi(4)
    //   .then(listPT => {
    //     this.newDeals = listPT;
    //     console.log(this.newDeals);
    //   });
    // this.ptService.layPhongtroHot(4)
    //   .then(listPT => {
    //     this.hotDeals = listPT;
    //     console.log(this.hotDeals);
    //   });
  }

  ngAfterViewInit() {
    $(this.el.nativeElement).flexslider({
      animation: 'slide',
      animationLoop: true,
      itemWidth: 285,
      controlNav: false
    });
    $(this.el2.nativeElement).flexslider({
      animation: 'slide',
      animationLoop: true,
      itemWidth: 285,
      controlNav: false
    });
  }

}
