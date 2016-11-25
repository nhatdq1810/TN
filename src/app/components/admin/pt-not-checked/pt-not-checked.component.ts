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
  private checkAllPT: boolean;

  constructor() {
    this.checkAllPT = false;
    this.fakeInit();
  }

  ngOnInit() {
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
