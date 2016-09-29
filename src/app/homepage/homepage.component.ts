/// <reference path="../../../node_modules/@types/jquery/index.d.ts" />

import { Component, ElementRef, AfterViewInit } from '@angular/core';

declare var $: JQueryStatic;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements AfterViewInit {

  model: string;
  specialDeals: any;
  constructor(private el: ElementRef) {
    this.specialDeals = {
      img1: 'assets/img/index-01.jpg',
      addr1: 'Gò Vấp',
      price1: 2000000,
      img2: 'assets/img/index-02.jpg',
      addr2: 'Quận 5',
      price2: 5000000
    }
  }

  ngAfterViewInit(){
    $(this.el.nativeElement).find('.flexslider').flexslider({
      controlNav: false
    });
  }

}
