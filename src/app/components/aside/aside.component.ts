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
      this.init();
    });
    this.route.params.subscribe(params => {
      this.init();
    });
  }

  init() {
    this.currentPT = this.ptService.currentPT;
    let giatien_max = 0;
    let giatienTheoNguoi_max = 0;
    if(this.currentPT.giatien > 0) {
      giatien_max = this.currentPT.giatien + 1000000;
    }
    if(this.currentPT.giatienTheoNguoi > 0) {
      giatienTheoNguoi_max = this.currentPT.giatienTheoNguoi + 1000000;
    }
    let searchTerm = {
      loaiPhong: this.currentPT.loaiPhong,
      giatien_min: 0,
      giatien_max: giatien_max,
      giatienTheoNguoi_min: 0,
      giatienTheoNguoi_max: giatienTheoNguoi_max,
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
          for (let i = 0; i < this.deals.length; i++) {
            if (this.deals[i].id === this.currentPT.id){
               this.deals.splice(i, 1);
               break;
            }
          }
          if(this.deals.length < 3) {
            this.ptService.layPhongtroMoi(6)
              .then(listPT => {
                this.deals = listPT;
                for (let i = 0; i < this.deals.length; i++) {
                  if (this.deals[i].id === this.currentPT.id){
                     this.deals.splice(i, 1);
                     break;
                  }
                }
                if(this.deals.length > 3) {
                  this.deals = this.deals.splice(0, 3);
                }
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
        this.ptService.layPhongtroMoi(6)
          .then(listPT => {
            this.deals = listPT;
            for (let i = 0; i < this.deals.length; i++) {
              if (this.deals[i].id === this.currentPT.id){
                 this.deals.splice(i, 1);
                 break;
              }
            }
            if(this.deals.length > 3) {
              this.deals = this.deals.splice(0, 3);
            }
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
