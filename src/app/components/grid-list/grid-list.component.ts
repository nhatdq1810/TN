import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.css']
})
export class GridListComponent implements OnInit {

  @Input() deals: any[];
  @Input() searchLink: string;
  @Input() getMoreDeals: Function;

  constructor() {

  }

  ngOnInit() {
    console.log(this.searchLink);
    console.log(this.getMoreDeals);
  }

}
