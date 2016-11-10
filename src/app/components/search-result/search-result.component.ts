import { Component, OnInit } from '@angular/core';
import { Phongtro } from '../../models/phongtro';
import { PhongtroService } from '../../services/phongtro.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  private listPT: any[];
  private complexForm: FormGroup;
  private initGioitinh: boolean;
  private initChu: boolean;
  private initWifi: boolean;
  private giatienValue: number[];
  private tiencocValue: number[];
  private dientichValue: number[];
  private searchTerm: any;

  constructor(private fb: FormBuilder, private ptService: PhongtroService) {
    // this.fakeInit();
    this.init();
  }

  ngOnInit() {

  }

  initListPT() {
    this.ptService.layPhongtroHot(7).then(resp => {
      this.listPT = resp;
    });
  }

  initSearchTerm() {
    this.complexForm = this.fb.group({
      'giatien': 500000,
      'tiencoc': 0,
      'dientich': 5,
      'truong': '',
      'nganh': '',
      'khoa': '',
      'gioitinh': 'nam',
      'wifi': 1,
      'chu': 1
    });

    this.initGioitinh = true;
    this.initChu = true;
    this.initWifi = true;
    this.giatienValue = [500000, 5000000];
    this.tiencocValue = [0, 5000000];
    this.dientichValue = [5, 20];
  }

  init() {
    this.listPT = this.ptService.listPT;
    this.searchTerm = this.ptService.searchTerm;

    if (!this.searchTerm) {
      this.initSearchTerm();
    } else {
      this.complexForm = this.fb.group({
        'giatien': this.searchTerm.giatien_min,
        'tiencoc': this.searchTerm.tiencoc_min,
        'dientich': this.searchTerm.dientich_min,
        'truong': this.searchTerm.truong,
        'nganh': this.searchTerm.nganh,
        'khoa': this.searchTerm.khoa,
        'gioitinh': this.searchTerm.gioitinh,
        'wifi': this.searchTerm.wifi,
        'chu': this.searchTerm.chu
      });

      if (this.searchTerm.gioitinh === 'nam') {
        this.initGioitinh = true;
      } else {
        this.initGioitinh = false;
      }
      if (this.searchTerm.chu === 1) {
        this.initChu = true;
      } else {
        this.initChu = false;
      }
      if (this.searchTerm.wifi === 1) {
        this.initWifi = true;
      } else {
        this.initWifi = false;
      }

      if(this.searchTerm.giatien_min > 5000000) {
        this.searchTerm.giatien_min = 5000000;
      }
      if (this.searchTerm.giatien_max > 5000000) {
        this.searchTerm.giatien_max = 5000000;
      }
      if (this.searchTerm.tiencoc_min > 5000000) {
        this.searchTerm.tiencoc_min = 5000000;
      }
      if (this.searchTerm.tiencoc_max > 5000000) {
        this.searchTerm.tiencoc_max = 5000000;
      }
      if (this.searchTerm.dientich_min > 20) {
        this.searchTerm.dientich_min = 20;
      }
      if (this.searchTerm.dientich_max > 20) {
        this.searchTerm.dientich_max = 20;
      }
      this.giatienValue = [this.searchTerm.giatien_min, this.searchTerm.giatien_max];
      this.tiencocValue = [this.searchTerm.tiencoc_min, this.searchTerm.tiencoc_max];
      this.dientichValue = [this.searchTerm.dientich_min, this.searchTerm.dientich_max];
    }
    if(!this.listPT || this.listPT.length === 0) {
      this.complexForm.value.giatien = [500000, 5000000];
      this.complexForm.value.tiencoc = [0, 5000000];
      this.complexForm.value.dientich = [5, 20];
      this.submitForm(this.complexForm.value);
    }
  }

  submitForm(value: any) {
    let searchTerm: any = {
      giatien_min: value.giatien[0],
      giatien_max: value.giatien[1],
      tiencoc_min: value.tiencoc[0],
      tiencoc_max: value.tiencoc[1],
      dientich_min: value.dientich[0],
      dientich_max: value.dientich[1],
      truong: value.truong,
      nganh: value.nganh,
      khoa: value.khoa,
      gioitinh: value.gioitinh,
      wifi: +(value.wifi),
      chu: +(value.chu)
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

  fakeInit() {
    this.searchTerm = this.ptService.searchTerm;
    this.listPT = [
      {
        id: 12,
        hinhanh: 'assets/img/index-08.jpg',
        diachi: '1236 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nữ',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 5000000
      },
      {
        id: 13,
        hinhanh: 'assets/img/index-09.jpg',
        diachi: '1234 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nam',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 2000000
      },
      {
        id: 14,
        hinhanh: 'assets/img/index-10.jpg',
        diachi: '1235 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nữ',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 5000000
      },
      {
        id: 15,
        hinhanh: 'assets/img/index-07.jpg',
        diachi: '123 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nữ',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 2000000
      },
      {
        id: 16,
        hinhanh: 'assets/img/index-08.jpg',
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
        id: 17,
        hinhanh: 'assets/img/index-09.jpg',
        diachi: '1234 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nam',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 2000000
      },
      {
        id: 18,
        hinhanh: 'assets/img/index-10.jpg',
        diachi: '1235 abc P.15 Quận Gò Vấp',
        songuoi: 2,
        dientich: 25,
        gioitinh: 'nữ',
        truong: 'PTIT',
        wifi: 1,
        ngaydang: '01/10/2016',
        giatien: 5000000
      }
    ];

    if (!this.searchTerm) {
      this.initSearchTerm();
    } else {
      this.complexForm = this.fb.group({
        'giatien': this.searchTerm.giatien_min,
        'tiencoc': 0,
        'dientich': 10,
        'truong': this.searchTerm.truong,
        'nganh': this.searchTerm.nganh,
        'khoa': '',
        'gioitinh': this.searchTerm.gioitinh,
        'wifi': 1,
        'chu': 1
      });

      if (this.searchTerm.gioitinh === 'nam') {
        this.initGioitinh = true;
      } else {
        this.initGioitinh = false;
      }
      this.giatienValue = [this.searchTerm.giatien_min, this.searchTerm.giatien_max];
      this.tiencocValue = [0, 5000000];
      this.dientichValue = [10, 20];
    }
  }

}
