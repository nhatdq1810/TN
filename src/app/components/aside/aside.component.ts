import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhongtroService } from '../../services/phongtro.service';

let Constants = require('../../resources/constants');

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  private deals: Array<any> = [];
  private searchLink: string = '/search/result';
  private currentPT: any;

  constructor(private ptService: PhongtroService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.ptService.phongtroDetailChange.subscribe(result => {
      if(result) {
        this.init();
      }
    });
    this.route.params.subscribe(params => {
      this.init();
    });
  }

  init() {
    this.currentPT = this.ptService.currentPT;
    let searchTerm = {
      loaiPhong: this.currentPT.loaiPhong,
      giatien_min: 500000,
      giatien_max: this.currentPT.giatien + 1000000,
      giatienTheoNguoi_min: 500000,
      giatienTheoNguoi_max: this.currentPT.giatienTheoNguoi + 1000000,
      dientich_min: 5,
      dientich_max: this.currentPT.dientich + 5,
      diachi: '',
      truong: '',
      nganh: '',
      khoa: '',
      gioitinh: this.currentPT.gioitinh
    };
    this.ptService.timkiemPhongtro(searchTerm, 6)
      .then(result => {
        if (result === 'success') {
          this.deals = this.ptService.listPT;
          this.deals.forEach((deal, index) => {
            if (deal.id === this.currentPT.id) {
              this.deals.splice(index, 1);
            }
          });
          if(this.deals.length < 3) {
            this.ptService.layPhongtroMoi(6)
              .then(listPT => {
                this.deals = listPT;
                this.deals.forEach((deal, index) => {
                  if (deal.id === this.currentPT.id) {
                    this.deals.splice(index, 1);
                  }
                });
                this.deals = this.deals.splice(0, 3);
              })
              .catch(err => {
                console.error(err);
              });
          } else {
            this.deals = this.deals.splice(0, 3);
          }
        }
      })
      .catch(err => {
        console.error(err);
        this.ptService.layPhongtroMoi(8)
          .then(listPT => {
            this.deals = listPT;
            this.deals.forEach((deal, index) => {
              if (deal.id === this.currentPT.id) {
                this.deals.splice(index, 1);
              }
            });
            this.deals = this.deals.splice(0, 4);
          })
          .catch(err => {
            console.error(err);
          });
      });
  }

  getMoreDeals(){
    console.log('aside');
  }
}
