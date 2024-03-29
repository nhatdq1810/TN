import { Component, OnInit, Input } from '@angular/core';
import { PhongtroService } from '../../services/phongtro.service';

let Constants = require('../../resources/constants');

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.css']
})
export class GridListComponent implements OnInit {

  @Input() deals: any[];
  @Input() searchLink: string = '/';
  @Input() getMoreDeals: Function;
  private quantityNewDeals: number = 3;
  private listTienichIcon: Array<string>;

  constructor(private ptService: PhongtroService) {

  }

  ngOnInit() {
    this.listTienichIcon = Constants.listTienichIcon;
    if(!this.getMoreDeals) {
      this.getMoreDeals = this.initGetMoreDeals;
    }
  }

  initGetMoreDeals() {
    this.quantityNewDeals += 3;

    this.ptService.layPhongtroMoi(this.quantityNewDeals)
      .then(listPT => {
        this.deals = listPT;
      });

    if (this.quantityNewDeals >= 9) {
      this.ptService.searchTerm = undefined;
      this.searchLink = '/search/result';
    }
  }

}
