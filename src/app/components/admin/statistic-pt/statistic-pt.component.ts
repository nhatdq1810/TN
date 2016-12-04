import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PhongtroService } from '../../../services/phongtro.service';

let Constants = require('../../../resources/constants');

@Component({
  selector: 'app-statistic-pt',
  templateUrl: './statistic-pt.component.html',
  styleUrls: ['./statistic-pt.component.css']
})
export class StatisticPtComponent implements OnInit {

  private datasetsUsers: Array<any> = [];
  private datasetsNewUsers: Array<any> = [];
  private datasetsPT: Array<any> = [];
  private datasetsNewPT: Array<any> = [];
  private labelsNewUsers: Array<any> = [];
  private labelsUsers: Array<any> = [];
  private labelsPT: Array<any> = [];
  private labelsNewPT: Array<any> = [];
  private options;
  private chartColors;

  constructor(private userService: UserService, private ptService: PhongtroService) {
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
        this.datasetsNewUsers = [{ label: 'User tạo mới trong tháng (người)', data: [] }];
        for (let i = 0; i < 6; ++i) {
          let tmpMonth = currentMonth - 5 + i;
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
    for (let i = 0; i < 4; i++) {
      this.userService.thongkeUserMoiTrenTongso(currentMonth - i)
        .then(resp => {
          if (i === 0) {
          }
          this.labelsUsers[i] = [`User tạo mới tháng ${currentMonth - i} (%)`, 'User cũ các tháng trước (%)'];
          let newUserPercent = +((resp['new'] / (resp['new'] + resp['old'])) * 100).toFixed(2);
          let oldUserPercent = +((resp['old'] / (resp['new'] + resp['old'])) * 100).toFixed(2);
          this.datasetsUsers[i] = [{ data: [newUserPercent, oldUserPercent] }];
        })
        .catch(err => {
          console.error(err);
        });
    }

    this.ptService.thongkePTTheoThang(currentMonth - 5, currentMonth)
      .then(resp => {
        this.datasetsNewPT = [{ label: 'Phòng trọ tạo mới (người)', data: [] }];
        for (let i = 0; i < 6; ++i) {
          let tmpMonth = currentMonth - 5 + i;
          this.labelsNewPT.push(`tháng ${tmpMonth}`);
          if (resp[tmpMonth]) {
            this.datasetsNewPT[0].data[i] = resp[tmpMonth];
          } else {
            this.datasetsNewPT[0].data[i] = 0;
            resp[tmpMonth] = 0;
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
    for (let i = 0; i < 4; i++) {
      this.ptService.thongkePTMoiTrenTongso(currentMonth - i)
        .then(resp => {
          if (i === 0) {
          }
          this.labelsPT[i] = [`Phòng trọ tạo mới tháng ${currentMonth - i} (%)`, 'Phòng trọ cũ các tháng trước (%)'];
          let newPTPercent = +((resp['new'] / (resp['new'] + resp['old'])) * 100).toFixed(2);
          let oldPTPercent = +((resp['old'] / (resp['new'] + resp['old'])) * 100).toFixed(2);
          this.datasetsPT[i] = [{ data: [newPTPercent, oldPTPercent] }];
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
}
