import { Component, OnInit } from '@angular/core';
import { Phongtro } from '../../models/phongtro';
import { PhongtroService } from '../../services/phongtro.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

let Constants = require('../../resources/constants');

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  private listPT: any[];
  private complexForm: FormGroup;
  private initLoaiPhong: number;
  private initGioitinh: string;
  private giatienValue: number[];
  private giatienTheoNguoiValue: number[];
  private dientichValue: number[];
  private searchTerm: any;
  private listTruong;
  private truong = '';
  private listNganh;
  private nganh = '';
  private listKhoa;
  private khoa = '';

  constructor(private fb: FormBuilder, private ptService: PhongtroService) {
    this.init();
  }

  ngOnInit() {

  }

  initSearchTerm() {
    this.complexForm = this.fb.group({
      'loaiPhong': 2,
      'giatien': 1000000,
      'giatienTheoNguoi': 1000000,
      'dientich': 5,
      'duong': '',
      'phuong': '',
      'quan': '',
      'tp': '',
      'truong': '',
      'nganh': '',
      'khoa': '',
      'gioitinh': ''
    });

    this.initLoaiPhong = 2;
    this.initGioitinh = '';
    this.giatienValue = [1000000, 5000000];
    this.giatienTheoNguoiValue = [1000000, 5000000];
    this.dientichValue = [5, 20];
  }

  init() {
    window.scrollTo(0, 0);
    this.ptService.layDulieuTimkiemPhongtro()
      .then(result => {
        if (result === 'success') {
          this.listTruong = this.ptService.listTruong;
          this.listNganh = this.ptService.listNganh;
          this.listKhoa = this.ptService.listKhoa;
        }
      });
    this.listPT = this.ptService.listPT;
    this.searchTerm = this.ptService.searchTerm;

    if (!this.searchTerm) {
      this.initSearchTerm();
    } else {
      this.complexForm = this.fb.group({
        'loaiPhong': this.searchTerm.loaiPhong,
        'giatien': this.searchTerm.giatien_min,
        'giatienTheoNguoi': this.searchTerm.giatienTheoNguoi_min,
        'dientich': this.searchTerm.dientich_min,
        'duong': '',
        'phuong': '',
        'quan': '',
        'tp': '',
        'truong': this.searchTerm.truong,
        'nganh': this.searchTerm.nganh,
        'khoa': this.searchTerm.khoa,
        'gioitinh': this.searchTerm.gioitinh
      });
      this.truong = this.searchTerm.truong;
      this.nganh = this.searchTerm.nganh;
      this.khoa = this.searchTerm.khoa;
      this.initLoaiPhong = this.searchTerm.loaiPhong;
      this.initGioitinh = this.searchTerm.gioitinh;

      if(this.searchTerm.giatien_min > 5000000) {
        this.searchTerm.giatien_min = 5000000;
      }
      if (this.searchTerm.giatien_max > 5000000) {
        this.searchTerm.giatien_max = 5000000;
      }
      if (this.searchTerm.dientich_min > 20) {
        this.searchTerm.dientich_min = 20;
      }
      if (this.searchTerm.dientich_max > 20) {
        this.searchTerm.dientich_max = 20;
      }
      this.giatienValue = [this.searchTerm.giatien_min, this.searchTerm.giatien_max];
      this.giatienTheoNguoiValue = [this.searchTerm.giatienTheoNguoi_min, this.searchTerm.giatienTheoNguoi_max];
      this.dientichValue = [this.searchTerm.dientich_min, this.searchTerm.dientich_max];
    }
    if(!this.listPT || this.listPT.length === 0) {
      this.complexForm.value.giatien = [1000000, 5000000];
      this.complexForm.value.giatienTheoNguoi = [1000000, 5000000];
      this.complexForm.value.dientich = [5, 20];
      this.submitForm(this.complexForm.value);
    }
  }

  submitForm(value: any) {
    let diachi: string = '';
    let giatien_min = 0;
    let giatien_max = 0;
    let giatienTheoNguoi_min = 0;
    let giatienTheoNguoi_max = 0;
    diachi += value.duong;
    if (value.phuong !== '') {
      diachi += ', phường ' + value.phuong.toLowerCase();
    }
    if (value.quan !== '') {
      diachi += ', quận ' + value.quan.toLowerCase();
    }
    if (value.tp !== '') {
      diachi += ', thành phố ' + value.tp.toLowerCase();
    }

    value.loaiPhong = +value.loaiPhong;
    if(value.loaiPhong === 0) {
      giatien_min = value.giatien[0];
      giatien_max = value.giatien[1];
    } else if(value.loaiPhong === 1) {
      giatienTheoNguoi_min = value.giatienTheoNguoi[0];
      giatienTheoNguoi_max = value.giatienTheoNguoi[1];
    } else {
      giatien_min = value.giatien[0];
      giatien_max = value.giatien[1];
      giatienTheoNguoi_min = value.giatienTheoNguoi[0];
      giatienTheoNguoi_max = value.giatienTheoNguoi[1];
    }

    value.truong = this.truong;
    value.nganh = this.nganh;
    value.khoa = this.khoa;
    let searchTerm: any = {
      loaiPhong: value.loaiPhong,
      giatien_min: giatien_min,
      giatien_max: giatien_max,
      giatienTheoNguoi_min: giatienTheoNguoi_min,
      giatienTheoNguoi_max: giatienTheoNguoi_max,
      dientich_min: value.dientich[0],
      dientich_max: value.dientich[1],
      diachi: diachi,
      truong: value.truong,
      nganh: value.nganh,
      khoa: value.khoa,
      gioitinh: value.gioitinh
    }
    this.ptService.timkiemPhongtro(searchTerm, 12)
      .then((result: string) => {
        if (result === 'success') {
          this.listPT = this.ptService.listPT;
        }
      })
      .catch(result => {
        if(result) {
          this.listPT = [];
        }
      });
  }
}
