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
  constructor(private el: ElementRef) { }

  ngAfterViewInit(){
    $(this.el.nativeElement).find('.flexslider').flexslider({
      controlNav: false
    });
  }

}
