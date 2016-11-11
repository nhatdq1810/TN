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
    this.init();
    // this.fakeInit();
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
    let tiencoc_max = 0;
    if(!this.currentPT.tiencoc || this.currentPT.tiencoc === 0) {
      tiencoc_max = this.currentPT.giatien;
    } else {
      tiencoc_max = this.currentPT.tiencoc;
    }
    let searchTerm = {
      giatien_min: 500000,
      giatien_max: this.currentPT.giatien + 1000000,
      tiencoc_min: 0,
      tiencoc_max: tiencoc_max + 1000000,
      dientich_min: 5,
      dientich_max: this.currentPT.dientich + 5,
      truong: '',
      nganh: '',
      khoa: '',
      gioitinh: this.currentPT.gioitinh,
      wifi: +(this.currentPT.wifi),
      chu: +(this.currentPT.chu)
    };
    this.ptService.timkiemPhongtro(searchTerm, 4)
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
              })
              .catch(err => {
                console.error(err);
              });
          }
        }
      }).catch(err => {
        console.error(err);
        this.ptService.layPhongtroHot(4)
          .then(listPT => {
            this.deals = listPT;
            this.deals.forEach((deal, index) => {
              if (deal.id === this.currentPT.id) {
                this.deals.splice(index, 1);
              }
            });
          })
          .catch(err => {
            console.error(err);
          });
      });
  }

  fakeInit() {
    this.deals = Constants.fakeListPt;
  }

}
