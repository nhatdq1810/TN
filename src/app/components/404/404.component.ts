import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhongtroService } from '../../services/phongtro.service';

let Constants = require('../../resources/constants');

@Component({
  selector: 'app-404',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.css']
})
export class Error404Component implements OnInit {

  private deals: Array<any>;

  constructor(private ptService: PhongtroService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // this.init();
      this.fakeInit();
    })
  }

  init() {
    this.ptService.layPhongtroHot(4)
      .then(result => {
        this.deals = result;
        if (this.deals.length === 0) {
          this.ptService.layPhongtroMoi(4)
            .then(result => {
              this.deals = result;
            })
            .catch(err => {
              console.error(err);
            });
        }
      }).catch(err => {
        console.error(err);
        this.ptService.layPhongtroMoi(4)
          .then(result => {
            this.deals = result;
          })
          .catch(err => {
            console.error(err);
          });
      });
  }

  searchFull() {
    this.ptService.searchTerm = undefined;
    this.ptService.listPT = [];
  }

  fakeInit() {
    this.deals = Constants.fakeListPt.splice(0, 4);
  }

}
