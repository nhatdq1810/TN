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
  private giatienValue: number[];
  private tiencocValue: number[];
  private dientichValue: number[];
  private searchTerm: any;

  constructor(private fb: FormBuilder, private ptService: PhongtroService) {
    this.fakeInit();
    // this.init();
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
      'dientich': 10,
      'truong': '',
      'nganh': '',
      'khoa': '',
      'gioitinh': '',
      'wifi': 1,
      'chu': 1
    });

    this.initGioitinh = true;
    this.giatienValue = [500000, 5000000];
    this.tiencocValue = [0, 5000000];
    this.dientichValue = [10, 20];
  }

  init() {
    this.listPT = this.ptService.listPT;
    this.searchTerm = this.ptService.searchTerm;
    if (this.listPT.length === 0) {
      this.initListPT();
    }
    if (!this.searchTerm) {
      this.initSearchTerm();
    } else {
      this.complexForm = this.fb.group({
        'giatien': this.searchTerm.giatien[0],
        'tiencoc': this.searchTerm.tiencoc[0],
        'dientich': this.searchTerm.dientich[0],
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
      this.giatienValue = [this.searchTerm.giatien[0], this.searchTerm.giatien[1]];
      this.tiencocValue = [this.searchTerm.tiencoc[0], this.searchTerm.tiencoc[1]];
      this.dientichValue = [this.searchTerm.dientich[0], this.searchTerm.dientich[1]];
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
    console.log(searchTerm);
    // this.ptService.timkiemPhongtro(searchTerm)
    //   .then((result: string) => {
    //     if (result === 'success') {
    //       this.router.navigate(['/search/result']);
    //     }
    //   });
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
