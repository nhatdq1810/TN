import { Component, OnInit } from '@angular/core';
import { PhongtroService } from '../../../services/phongtro.service';
import { UserService } from '../../../services/user.service';

let Constants = require('../../../resources/constants');

@Component({
  selector: 'app-pt-checked',
  templateUrl: './pt-checked.component.html',
  styleUrls: ['./pt-checked.component.css']
})
export class PtCheckedComponent implements OnInit {

  private listPhongtroChecked: Array<any> = [];
  private listPhongtroCheckedView: Array<any> = [];
  private listUser: Array<any> = [];
  private listPTNotAccept: Array<boolean> = [];
  private checkAllPT: boolean;
  private selectedPT: any;

  constructor(private ptService: PhongtroService, private userService: UserService) {
    this.init();
    // this.fakeInit();
  }

  ngOnInit() {
  }

  init() {
    this.checkAllPT = false;
    this.ptService.layTatcaPhongtro(1)
      .then(resp => {
        this.listPhongtroChecked = resp;
        this.listPhongtroCheckedView = resp;
        this.listPhongtroCheckedView.forEach((pt, index) => {
          this.userService.layThongtinUserID(pt.userID)
            .then(resp => {
              if (!this.listUser[pt.userID]) {
                if(resp.username.indexOf('f-') > -1) {
                  resp.username = resp.username.split('f-')[1];
                }
                if (resp.username.indexOf('g-') > -1) {
                  resp.username = resp.username.split('g-')[1];
                }
                this.listUser[pt.userID] = resp;
              }
            })
            .catch(err => {
              console.error(err);
              this.listUser[pt.userID] = 'Không xác định';
            })
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  searchPT(term: string) {

  }

  updateCheckAll(event, index) {
    this.listPTNotAccept[index] = event;
    this.checkAllPT = this.listPTNotAccept.every((value) => {
      return value === true;
    });
  }

  checkAll() {
    let valueSet = !this.listPTNotAccept.every((value) => {
      return value === true;
    });
    this.listPTNotAccept.forEach((value, index) => {
      this.listPTNotAccept[index] = valueSet;
    })
  }

  submit() {
    console.log(this.listPTNotAccept);
    console.log(this.listPhongtroChecked)
  }

  fakeInit() {
    this.checkAllPT = false;
    this.listPhongtroChecked = Constants.fakeListPT;
    for (let i = 0; i < this.listPhongtroChecked.length; ++i) {
      this.listPTNotAccept[i] = false;
    }
  }

}
