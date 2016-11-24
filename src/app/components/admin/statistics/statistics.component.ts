import { Component, OnInit } from '@angular/core';

let Constants = require('../../../resources/constants');

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  private datasetsUsers;
  private labels;
  private datasetsPT;
  private options;
  private chartColors;

  constructor() {
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
    this.labels = [];
    for (var i = 0; i<6; ++i) {
      this.labels.push(`tháng ${currentMonth - 5 + i}`);
    }
    this.fakeInit();
  }

  ngOnInit() {
  }

  fakeInit() {
    this.datasetsUsers = [{
      label: 'Số lượt đăng ký user',
      data: [12, 19, 3, 5, 2, 3]
    }];
    this.datasetsPT = [{
      label: 'Số lượt tạo phòng trọ',
      data: [2, 19, 23, 5, 0, 3]
    }];
  }

}
