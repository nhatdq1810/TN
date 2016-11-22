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
  private currentPage: number = 1;

  constructor() {
    this.listLi = [{
      'i': 'fa fa-power-switch',
      'span': 'Dashboard'
    },
    {
      'i': 'fa fa-spell-check',
      'span': 'Forms'
    },
    {
      'i': 'fa fa-menu',
      'span': 'Tables'
    },
    {
      'i': 'fa fa-pencil',
      'span': 'Typography'
    },
    {
      'i': 'fa fa-select',
      'span': 'Media Css'
    }];
    for (let i = 0; i < this.listLi.length; ++i) {
      if(i === 0) {
        this.isLiActive[i] = true;
      } else {
        this.isLiActive[i] = false;
      }
    }
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
    for (var i = 0; i < this.listPhongtroNotChecked.length; ++i) {
      this.listPTAccept[i] = false;
      // Constants.fakeListUser.forEach((value, index) => {
      //   if (this.listPhongtroNotChecked[i].userID === value.id) {
      //     this.listUser[value.id] = value;
      //   }
      // });
    }
  }

}
