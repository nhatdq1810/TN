import { Component, OnInit } from '@angular/core';
import { PhongtroService } from '../../services/phongtro.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  private deals: Array<any> = [];
  private searchLink: string = '/search/result';
  private currentPT: any;

  constructor(private ptService: PhongtroService) {
    this.init();
    // this.fakeInit();
  }

  ngOnInit() {
    this.ptService.phongtroDetailChange.subscribe(currentPT => {
      this.init();
    });
  }

  init() {
    this.currentPT = this.ptService.currentPT;
    if(!this.currentPT.tiencoc || this.currentPT.tiencoc === 0) {
      this.currentPT.tiencoc = this.currentPT.giatien;
    }
    let searchTerm = {
      giatien_min: 500000,
      giatien_max: this.currentPT.giatien + 1000000,
      tiencoc_min: 0,
      tiencoc_max: this.currentPT.tiencoc + 1000000,
      dientich_min: 10,
      dientich_max: this.currentPT.dientich + 5,
      truong: '',
      nganh: '',
      khoa: '',
      gioitinh: this.currentPT.gioitinh,
      wifi: +(this.currentPT.wifi),
      chu: +(this.currentPT.chu)
    };
    this.ptService.timkiemPhongtro(searchTerm)
      .then(result => {
        if (result === 'success') {
          this.deals = this.ptService.listPT;
          this.deals.forEach((deal, index) => {
            if (deal.id === this.currentPT.id) {
              this.deals.splice(index, 1);
            }
          });
          if(this.deals.length === 0) {
            this.ptService.layPhongtroHot(4)
              .then(listPT => {
                this.deals = listPT;
                this.deals.forEach((deal, index) => {
                  if (deal.id === this.currentPT.id) {
                    this.deals.splice(index, 1);
                  }
                });
              });
          }
        }
      });
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
