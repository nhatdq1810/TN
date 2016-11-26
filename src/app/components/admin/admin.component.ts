import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PhongtroService } from '../../services/phongtro.service';

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
  private datasetsUsers: Array<any> = [];
  private datasetsNewUsers: Array<any> = [];
  private datasetsPT: Array<any> = [];
  private labelsNewUsers: Array<any> = [];
  private labelsUsers: Array<any> = [];
  private labelsPT: Array<any> = [];
  private options;
  private chartColors;

  constructor(private userService: UserService, private ptService: PhongtroService) {
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
    this.userService.thongkeUserTheoThang(currentMonth - 5, currentMonth)
      .then(resp => {
        this.datasetsNewUsers = [{ label: 'User mới (người)', data: [] }];
        for (let i = 0; i < 6; ++i) {
          let tmpMonth = currentMonth - 5 + i;
          this.labelsNewUsers.push(`tháng ${tmpMonth}`);
          if(resp[tmpMonth]) {
            this.datasetsNewUsers[0].data[i] = resp[tmpMonth];
          } else {
            this.datasetsNewUsers[0].data[i] = 0;
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
    this.userService.thongkeUserMoiTrenTongso(currentMonth)
      .then(resp => {
        this.labelsUsers = ['User mới tháng ' + currentMonth + ' (%)', 'User cũ' + ' (%)'];
        let newUserPercent = +((resp['new'] / (resp['new'] + resp['old'])) * 100).toFixed(2);
        let oldUserPercent = +((resp['old'] / (resp['new'] + resp['old'])) * 100).toFixed(2);
        this.datasetsUsers = [{ data: [newUserPercent, oldUserPercent] }];
      })
      .catch(err => {
        console.error(err);
      });
      for (let i = 0; i < 3; i++) {
        this.ptService.thongkePTMoiTrenTongso(currentMonth - i)
          .then(resp => {
            this.labelsPT[i] = ['Phòng trọ mới tháng ' + (currentMonth - i) + ' (%)', 'Phòng trọ cũ' + ' (%)'];
            let newPTPercent = +((resp['new'] / (resp['new'] + resp['old'])) * 100).toFixed(2);
            let oldPTPercent = +((resp['old'] / (resp['new'] + resp['old'])) * 100).toFixed(2);
            this.datasetsPT[i] = [{ data: [newPTPercent, oldPTPercent] }];
          })
          .catch(err => {
            console.error(err);
          });
      }
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
