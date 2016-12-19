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
  private datasetsNewUsers: Array<any> = [];
  private labelsUserKieuLogin: Array<any> = [];
  private labelsNewUsers: Array<any> = [];
  private options;
  private optionsPie;
  private listMonth: Array<number> = [];
  private selectedMonth: Array<number> = [];
  private currentMonth: number;

  constructor(private userService: UserService, private ptService: PhongtroService) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.listUserComment = [];
    this.listUserTaoPT = [];
    this.listUserTheoDTC = [];
    this.datasetsUserKieuLogin = [];
    this.datasetsNewUsers = [];
    this.labelsUserKieuLogin = [];
    this.labelsNewUsers = [];
    this.listMonth = [];
    this.selectedMonth = [];

    this.currentMonth = Constants.getCurrentDate().split('/')[1];
    for (let i = 0; i < 5; i++) {
      this.selectedMonth[i] = this.currentMonth;
      this.listMonth.push(this.selectedMonth[0] - i);
    }

    this.thongkeUserComment(this.selectedMonth[0]);
    this.thongkeUserTaoPT(this.selectedMonth[1]);
    this.thongkeUserTheoDTC(this.selectedMonth[2]);
    this.thongkeUserKieuLogin(this.selectedMonth[3]);
    this.initChartNewUsers();
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
    this.optionsPie = {
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 20,
          bottom: 20
        }
      }
    };
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

  initChartNewUsers() {
    this.options = Constants.chartOptions;
    this.datasetsNewUsers = [{ label: 'User tạo mới trong tháng (người)', data: [] }];
    this.labelsNewUsers = [];
    this.userService.thongkeUserTheoThang(this.currentMonth - 4, this.currentMonth)
      .then(resp => {
        for (let i = 0; i < 5; ++i) {
          let tmpMonth = this.currentMonth - 4 + i;
          this.labelsNewUsers.push(`tháng ${tmpMonth}`);
          if (resp[tmpMonth]) {
            this.datasetsNewUsers[0].data[i] = resp[tmpMonth];
          } else {
            this.datasetsNewUsers[0].data[i] = 0;
            resp[tmpMonth] = 0;
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
}
