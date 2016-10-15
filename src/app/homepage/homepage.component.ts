/// <reference path="../../../node_modules/@types/jquery/index.d.ts" />

import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { PhongtroService } from '../services/phongtro.service';

declare let $: JQueryStatic;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit, AfterViewChecked{

  private model: string;
  private specialDeals: any[] = [];
  private hotDeals: any[];
  private newDeals: any[];
  private quantityNewDeals: number;
  private outOfNumber: boolean;
  @ViewChild('flexslider') el: ElementRef;
  // @ViewChild('flexslider2') el2: ElementRef;

  constructor(private ptService: PhongtroService) {
    // this.fakeInit();
    this.init();
  }

  init() {
    this.outOfNumber = false;
    this.quantityNewDeals = 4;

    this.ptService.layPhongtro(1)
      .then(pt => {
        this.specialDeals[0] = pt;
      });
    this.ptService.layPhongtro(2)
      .then(pt => {
        this.specialDeals[1] = pt;
      });
    this.ptService.layPhongtroHot(6)
      .then(listPT => {
        this.hotDeals = listPT;
      });
    this.ptService.layPhongtroMoi(this.quantityNewDeals)
      .then(listPT => {
        this.newDeals = listPT;
      });
  }

  ngOnInit() {

  }

  ngAfterViewChecked() {
    $(this.el.nativeElement).flexslider({
      animation: 'slide',
      animationLoop: false,
      minItems: 2,
      itemWidth: 250
    });
    // $(this.el2.nativeElement).flexslider({
    //   animation: 'slide',
    //   animationLoop: false,
    //   minItems: 2,
    //   itemWidth: 285
    // });
  }

  getMoreHotDeals() {
    this.ptService.layPhongtroHot(10);
  }

  getMoreNewDeals() {
    this.quantityNewDeals += 4;
    this.ptService.layPhongtroMoi(this.quantityNewDeals)
      .then(listPT => {
        this.newDeals = listPT;
        if(this.quantityNewDeals > this.newDeals.length) {
          this.outOfNumber = true;
        }
      });
  }

  fakeInit() {
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
        gioitinh: 'nữ',
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
        gioitinh: 'nữ',
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
        gioitinh: 'nữ',
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
        gioitinh: 'nữ',
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
        gioitinh: 'nữ',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 5000000
      },
      {
        id: 15,
        hinhanh: 'assets/img/index-07.jpg',
        diachi: '123 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        gioitinh: 'nữ',
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
        gioitinh: 'nữ',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 5000000
      }
    ];
  }

}
