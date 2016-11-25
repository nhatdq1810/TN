import { Component, OnInit } from '@angular/core';

let Constants = require('../../../resources/constants');

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  private datasetsUsers;
  private labelsNewUsers;
  private labelsUsers;
  private datasetsNewUsers;
  private options;
  private chartColors;
  private listUser;

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
    this.labelsNewUsers = [];
    for (let i = 0; i<6; ++i) {
      this.labelsNewUsers.push(`tháng ${currentMonth - 5 + i}`);
    }
    this.labelsUsers = ['User mới', 'User cũ'];

    this.fakeInit();
  }

  ngOnInit() {
  }

  fakeInit() {
    this.datasetsNewUsers = [{
      label: 'User mới',
      data: [12, 9, 3, 5, 2, 10]
    }];
    this.datasetsUsers = [{
      data: [10, 21]
    }];
    this.listUser = Constants.fakeListUser;
  }

}
