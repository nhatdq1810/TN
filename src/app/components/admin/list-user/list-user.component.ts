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
  private listUser: Array<any> = [];
  private listUserView: Array<any> = [];
  private checkAllUser: boolean;
  private isDelete: boolean;
  private listUserDelete: Array<any> = [];
  private listUserDeleteView: Array<boolean> = [];

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

  wantDelete() {
    this.isDelete = !this.isDelete;
    this.checkAllUser = false;
    for (let i = 0; i < this.listUser.length; ++i) {
        this.listUserDeleteView[i] = false;
    }
  }

  searchUser(term: string) {
    if (term && term !== '') {
      this.listUserView = [];
      for (let i = 0; i < this.listUser.length; i++) {
        for (let propPT in this.listUser[i]) {
          console.log(this.listUser[i]);
          if (this.listUser[i][propPT].toString().indexOf(term) > -1) {
            this.listUserView.push(this.listUser[i]);
            break;
          }
        }
      }
    } else {
      this.listUserView = this.listUser;
    }
  }

  updateCheckAll(event, index, user) {
    this.listUserDeleteView[index] = event;
    this.listUserDelete[user.id] = event;
    console.log(event);
    this.checkAllUser = this.listUserDeleteView.every((value) => {
      console.log(value);
      return value === true;
    });
    console.log(this.checkAllUser);
    console.log(this.listUserDeleteView);
  }

  checkAll() {
    let valueSet = !this.listUserDeleteView.every((value) => {
      return value === true;
    });
    this.listUserDeleteView.forEach((value, index) => {
      this.listUserDeleteView[index] = valueSet;
    })
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
    this.listUserView = Constants.fakeListUser;
    for (var i = 0; i < this.listUser.length; ++i) {
      this.listUserDelete[i] = false;
      this.listUserDeleteView[i] = false;
    }
  }

}
