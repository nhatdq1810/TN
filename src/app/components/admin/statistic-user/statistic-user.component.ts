import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { PhongtroService } from '../../../services/phongtro.service';

let Constants = require('../../../resources/constants');

@Component({
  selector: 'app-statistic-user',
  templateUrl: './statistic-user.component.html',
  styleUrls: ['./statistic-user.component.css']
})
export class StatisticUserComponent implements OnInit {

  private listUserComment: Array<any> = [];
  private listUserTaoPT: Array<any> = [];
  private listUserTheoDTC: Array<any> = [];
  private datasetsUserKieuLogin: Array<any> = [];
  private labelsUserKieuLogin: Array<any> = [];
  private options;
  private optionsPie;
  private chartColors;
  private listMonth: Array<number> = [];
  private selectedMonth: Array<number> = [];

  constructor(private userService: UserService, private ptService: PhongtroService) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    for (let i = 0; i < 5; i++) {
      this.selectedMonth[i] = Constants.getCurrentDate().split('/')[1];
      this.listMonth.push(this.selectedMonth[0] - i);
    }

    this.thongkeUserComment(this.selectedMonth[0]);
    this.thongkeUserTaoPT(this.selectedMonth[1]);
    this.thongkeUserTheoDTC(this.selectedMonth[2]);
    this.thongkeUserKieuLogin(this.selectedMonth[3]);
  }

  thongkeUserComment(e: any) {
    this.selectedMonth[0] = e;
    this.userService.thongkeUserComment(this.selectedMonth[0], 5)
      .then(result => {
        this.listUserComment = result;
      })
      .catch(err => {
        console.error(err);
        this.listUserComment = [];
      });
  }

  thongkeUserTaoPT(e: any) {
    this.selectedMonth[1] = e;
    this.userService.thongkeUserTaoPT(this.selectedMonth[1], 5)
      .then(result => {
        this.listUserTaoPT = result;
      })
      .catch(err => {
        console.error(err);
      });
  }

  thongkeUserTheoDTC(e: any) {
    this.selectedMonth[2] = e;
    this.userService.thongkeUserTheoDTC(this.selectedMonth[2], 5)
      .then(result => {
        this.listUserTheoDTC = result;
      })
      .catch(err => {
        console.error(err);
      });
  }

  thongkeUserKieuLogin(e: any) {
    this.selectedMonth[3] = e;
    this.labelsUserKieuLogin = [];
    this.datasetsUserKieuLogin = [];
    this.userService.thongkeUserKieuLogin(this.selectedMonth[3])
      .then(result => {
        for (let prop in result) {
          this.labelsUserKieuLogin.push(prop);
          this.datasetsUserKieuLogin.push(result[prop]);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  initChart() {
    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      layout: {
        padding: 20
      }
    };
  }
}
