import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

let Constants = require('../../resources/constants');
declare let $: JQueryStatic;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private isLiActive: Array<boolean> = [];
  private isChildLiActive: Array<boolean> = [];
  private listLi: Array<any> = [];
  private statusPage: string;
  @ViewChild('navigation') navigation: ElementRef;
  private datasetsUsers;
  private labelsNewUsers;
  private labelsUsers;
  private datasetsNewUsers;
  private options;
  private chartColors;

  constructor() {
    this.listLi = [{
      'a': 'home',
      'i': 'fa fa-tachometer',
      'span': 'Trang chủ'
    },
    {
      'a': 'user',
      'i': 'fa fa-users',
      'span': 'Quản lý user',
      'li': ['Phòng chờ duyệt', 'Phòng đã duyệt']
    },
    {
      'a': 'pt-not-checked',
      'i': 'fa fa-home',
      'span': 'Quản lý phòng trọ',
      'li': ['Phòng chờ duyệt','Phòng đã duyệt']
    },
    {
      'a': 'email',
      'i': 'fa fa-envelope-o',
      'span': 'Email'
    }];
    for (let i = 0; i < this.listLi.length; ++i) {
      if(i === 0) {
        this.isLiActive[i] = true;
      } else {
        this.isLiActive[i] = false;
      }
    }
    this.statusPage = 'home';
    this.initChart();
  }

  ngOnInit() {
  }

  initChart() {
    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
    this.chartColors = [{
      borderWidth: '0.5',
      borderColor: '#c72',
      pointBackgroundColor: '#c7254e',
      pointHoverBackgroundColor: 'transparent',
      pointBorderColor: '#c7254e',
      pointHoverRadius: 10
    }];
    let currentMonth = Constants.getCurrentDate().split('/')[1];
    this.labelsNewUsers = [];
    for (let i = 0; i < 6; ++i) {
      this.labelsNewUsers.push(`tháng ${currentMonth - 5 + i}`);
    }
    this.labelsUsers = ['User mới', 'User cũ'];
    this.datasetsNewUsers = [{
      label: 'User mới',
      data: [12, 9, 3, 5, 2, 10]
    }];
    this.datasetsUsers = [{
      data: [10, 21]
    }];
  }

  initChildLiActive(index) {
    let thisLi = $(this.navigation.nativeElement).children('li').eq(index);
    if (thisLi.has('.nav.child-menu')) {
      for (let i = 0; i < thisLi.children('.nav.child-menu').children('li').length; ++i) {
        if (i === 0) {
          this.isChildLiActive[i] = true;
        } else {
          this.isChildLiActive[i] = false;
        }
      }
    }
  }

  slideDown(index) {
    let thisLi = $(this.navigation.nativeElement).children('li').eq(index);
    if (thisLi.has('.nav.child-menu')) {
      $(this.navigation.nativeElement).children('li').not(`:eq(${index})`).children('.nav.child-menu').slideUp(300);
      thisLi.children('.nav.child-menu').slideToggle(300);
      this.initChildLiActive(index);
    }
  }

  activeLi(index: number) {
    for (let i = 0; i < this.listLi.length; ++i) {
      if(i === index) {
        this.isLiActive[i] = true;
      } else {
        this.isLiActive[i] = false;
      }
    }
  }
}
