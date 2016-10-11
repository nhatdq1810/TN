/// <reference path="../../../node_modules/@types/jquery/index.d.ts" />

import { Component, OnInit } from '@angular/core';
import { PhongtroService } from '../services/phongtro.service';

declare var $: JQueryStatic;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit{

  private model: string;
  private specialDeals: any;
  private hotDeals: any;
  private newDeals: any;

  constructor(private ptService: PhongtroService) {
    this.specialDeals = [
      {
        hinhanh: 'assets/img/index-01.jpg',
        diachi: 'Gò Vấp',
        giatien: 2000000
      },
      {
        hinhanh: 'assets/img/index-02.jpg',
        diachi: 'Quận 5',
        giatien: 5000000
      }
    ];
    this.hotDeals = [
      {
        hinhanh: 'assets/img/index-03.jpg',
        diachi: '123 abc P.15 Quận Gò Vấp',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 2000000
      },
      {
        hinhanh: 'assets/img/index-04.jpg',
        diachi: '1236 abc P.15 Quận Gò Vấp',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 5000000
      },
      {
        hinhanh: 'assets/img/index-05.jpg',
        diachi: '1234 abc P.15 Quận Gò Vấp',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 2000000
      },
      {
        hinhanh: 'assets/img/index-06.jpg',
        diachi: '1235 abc P.15 Quận Gò Vấp',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 5000000
      }
    ];
    this.newDeals = [
      {
        hinhanh: 'assets/img/index-07.jpg',
        diachi: '123 abc P.15 Quận Gò Vấp',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 2000000
      },
      {
        hinhanh: 'assets/img/index-08.jpg',
        diachi: '1236 abc P.15 Quận Gò Vấp',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 5000000
      },
      {
        hinhanh: 'assets/img/index-09.jpg',
        diachi: '1234 abc P.15 Quận Gò Vấp',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 2000000
      },
      {
        hinhanh: 'assets/img/index-10.jpg',
        diachi: '1235 abc P.15 Quận Gò Vấp',
        truong: 'PTIT',
        ngaydang: '01/10/2016',
        giatien: 5000000
      }
    ];
  }

  ngOnInit() {
    this.ptService.layPhongtroMoi(4)
      .then(listPT => {
        this.newDeals = listPT;
        console.log(this.newDeals);
      });
    this.ptService.layPhongtroHot(4)
      .then(listPT => {
        this.hotDeals = listPT;
        console.log(this.hotDeals);
      });
  }

}
