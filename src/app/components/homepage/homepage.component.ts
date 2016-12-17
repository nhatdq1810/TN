/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />

import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { PhongtroService } from '../../services/phongtro.service';

declare let $: JQueryStatic;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit, AfterViewChecked{

  private model: string;
  private hotDeals: any[];
  private newDeals: any[];
  private quantityNewDeals: number;
  private searchLink: string;
  @ViewChild('flexslider') el: ElementRef;

  constructor(private ptService: PhongtroService, private router: Router) {
    this.init();
  }

  init() {
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

  getMoreHotDeals() {
    this.ptService.layPhongtroHot(10);
  }
}
