import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailPopupComponent } from '../detail-popup/detail-popup.component';

let Constants = require('../../../resources/constants');

@Component({
  selector: 'app-pt-not-checked',
  templateUrl: './pt-not-checked.component.html',
  styleUrls: ['./pt-not-checked.component.css']
})
export class PtNotCheckedComponent implements OnInit {

  @ViewChild('detailPopup') detailPopup: DetailPopupComponent;
  private listPTNotChecked: Array<any> = [];
  private listPTCheckbox: Array<boolean> = [];
  private checkAllPT: boolean;
  private selectedPT: any;

  constructor() {
    this.fakeInit();
  }

  ngOnInit() {
  }

  init() {
    this.checkAllPT = false;
  }

  showDetailItem(item) {
    this.selectedPT = item;
    this.detailPopup.showPopup();
  }

  deletePT() {
    console.log(this.listPTCheckbox);
  }

  updateCheckAll(event, index, type) {
    if(type === 'accept') {
      this.listPTCheckbox[index] = event;
      this.checkAllPT = this.listPTCheckbox.every((value) => {
        return value === true;
      });
    }
  }

  checkAll() {
    let valueSet = !this.listPTCheckbox.every((value) => {
      return value === true;
    });
    this.listPTCheckbox.forEach((value, index) => {
      this.listPTCheckbox[index] = valueSet;
    });
  }

  acceptPT() {
    console.log(this.listPTCheckbox);
  }

  denyPT() {
    console.log(this.listPTCheckbox);
  }

  fakeInit() {
    this.checkAllPT = false;
    this.listPTNotChecked = Constants.fakeListPT;
    for (let i = 0; i < this.listPTNotChecked.length; ++i) {
      this.listPTCheckbox[i] = false;
    }
  }

}
