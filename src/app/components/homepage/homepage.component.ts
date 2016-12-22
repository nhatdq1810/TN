/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />

import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { PhongtroService } from '../../services/phongtro.service';

declare let $: JQueryStatic;
let Constants = require('../../resources/constants');

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit, AfterViewChecked{

  @ViewChild('flexslider') el: ElementRef;
  private model: string;
  private hotDeals: any[];
  private newDeals: any[];
  private quantityNewDeals: number;
  private searchLink: string;
  private listTienichIcon: Array<string>;

  constructor(private ptService: PhongtroService, private router: Router) {
    this.init();
  }

  init() {
    this.listTienichIcon = Constants.listTienichIcon;
    this.quantityNewDeals = 3;
    this.searchLink = ('/');

    this.ptService.layPhongtroHot(6)
      .then(listPT => {
        this.hotDeals = listPT;
      });
    this.ptService.layPhongtroMoi(this.quantityNewDeals)
      .then(listPT => {
        this.newDeals = listPT;
      });
  }

  ngOnInit() {

  }

  ngAfterViewChecked() {
    $(this.el.nativeElement).flexslider({
      animation: 'slide',
      animationLoop: false,
      itemWidth: 350,
      itemMargin: 10
    });
  }
}
