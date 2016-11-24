import { Component, OnInit } from '@angular/core';

let Constants = require('../../resources/constants');

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private isLiActive: Array<boolean> = [];
  private listLi: Array<any> = [];
  private listPTAccept: Array<boolean> = [];
  private listUser: Array<any> = [];
  private listPhongtroNotChecked: Array<any> = [];
  private checkAllPT: boolean;
  private statusPage: string;

  constructor() {
    this.listLi = [{
      'a': 'home',
      'i': 'fa fa-tachometer',
      'span': 'Trang chủ'
    },
    {
      'a': 'user',
      'i': 'fa fa-users',
      'span': 'Quản lý user'
    },
    {
      'a': 'pt',
      'i': 'fa fa-home',
      'span': 'Quản lý phòng trọ'
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
    this.checkAllPT = false;
    this.statusPage = 'home';
    this.fakeInit();
  }

  ngOnInit() {
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

  updateCheckAll(event, index) {
    this.listPTAccept[index] = event;
    this.checkAllPT = this.listPTAccept.every((value) => {
      return value === true;
    });
  }

  checkAll() {
    let valueSet = !this.listPTAccept.every((value) => {
      return value === true;
    });
    this.listPTAccept.forEach((value, index) => {
      this.listPTAccept[index] = valueSet;
    })
  }

  submit() {
    console.log(this.listPTAccept);
  }

  fakeInit() {
    this.listPhongtroNotChecked = Constants.fakeListPT;
    for (let i = 0; i < this.listPhongtroNotChecked.length; ++i) {
      this.listPTAccept[i] = false;
    }
  }

}
