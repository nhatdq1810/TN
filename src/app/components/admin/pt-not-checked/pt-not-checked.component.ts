import { Component, OnInit } from '@angular/core';

let Constants = require('../../../resources/constants');

@Component({
  selector: 'app-pt-not-checked',
  templateUrl: './pt-not-checked.component.html',
  styleUrls: ['./pt-not-checked.component.css']
})
export class PtNotCheckedComponent implements OnInit {

  private listPhongtroNotChecked: Array<any> = [];
  private listPTAccept: Array<boolean> = [];
  private listPTDelete: Array<boolean> = [];
  private checkAllPT: boolean;
  private isDelete: boolean;

  constructor() {
    this.fakeInit();
  }

  ngOnInit() {
  }

  init() {
    this.checkAllPT = false;
    this.isDelete = false;
  }

  wantDelete() {
    this.isDelete = !this.isDelete;
    this.checkAllPT = false;
    if(this.isDelete) {
      for (let i = 0; i < this.listPhongtroNotChecked.length; ++i) {
        this.listPTAccept[i] = false;
      }
    } else {
      for (let i = 0; i < this.listPhongtroNotChecked.length; ++i) {
        this.listPTDelete[i] = false;
      }
    }
  }

  updateCheckAll(event, index, type) {
    if(type === 'accept') {
      this.listPTAccept[index] = event;
      this.checkAllPT = this.listPTAccept.every((value) => {
        return value === true;
      });
    } else {
      this.listPTDelete[index] = event;
      this.checkAllPT = this.listPTDelete.every((value) => {
        return value === true;
      });
    }
  }

  checkAll() {
    if(this.isDelete) {
      let valueSet = !this.listPTDelete.every((value) => {
        return value === true;
      });
      this.listPTDelete.forEach((value, index) => {
        this.listPTDelete[index] = valueSet;
      });
    } else {
      let valueSet = !this.listPTAccept.every((value) => {
        return value === true;
      });
      this.listPTAccept.forEach((value, index) => {
        this.listPTAccept[index] = valueSet;
      });
    }
  }

  submit() {
    console.log(this.listPTDelete);
    console.log(this.listPTAccept);
  }

  fakeInit() {
    this.checkAllPT = false;
    this.isDelete = false;
    this.listPhongtroNotChecked = Constants.fakeListPT;
    for (let i = 0; i < this.listPhongtroNotChecked.length; ++i) {
      this.listPTAccept[i] = false;
      this.listPTDelete[i] = false;
    }
  }

}
