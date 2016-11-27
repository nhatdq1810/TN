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
  private listPTNotAccept: Array<any> = [];
  private listPTNotAcceptView: Array<boolean> = [];
  private checkAllPT: boolean;
  private searchTerm: string;

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
          this.listPTNotAcceptView[index] = false;
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
    if(term && term !== '') {
      this.listPhongtroCheckedView = [];
      for (let i = 0; i < this.listPhongtroChecked.length; i++) {
        for (let propPT in this.listPhongtroChecked[i]) {
          if (this.listPhongtroChecked[i][propPT].toString().indexOf(term) > -1) {
            this.listPhongtroCheckedView.push(this.listPhongtroChecked[i]);
            break;
          } else if(this.listUser[this.listPhongtroChecked[i].userID].username.indexOf(term) > -1) {
            this.listPhongtroCheckedView.push(this.listPhongtroChecked[i]);
            break;
          }
        }
      }
    } else {
      this.listPhongtroCheckedView = this.listPhongtroChecked;
    }
  }

  updateCheckAll(event, index, pt) {
    this.listPTNotAcceptView[index] = event;
    this.listPTNotAccept[pt.id] = event;
    this.checkAllPT = this.listPTNotAcceptView.every((value) => {
      return value === true;
    });
  }

  checkAll() {
    let valueSet = !this.listPTNotAcceptView.every((value) => {
      return value === true;
    });
    this.listPTNotAcceptView.forEach((value, index) => {
      this.listPTNotAcceptView[index] = valueSet;
    })
  }

  submit() {
    console.log(this.listPTNotAccept);
    // if(this.listPhongtroChecked.length === this.listPhongtroCheckedView.length) {
    //   this.listPhongtroCheckedView = [];
    //   for (let i = 0; i < this.listPTNotAcceptView.length; i++) {
    //     if (!this.listPTNotAcceptView[i]) {
    //       this.listPhongtroCheckedView.push(this.listPhongtroChecked[i]);
    //     } else {
    //       this.listPTNotAcceptView[i] = false;
    //     }
    //   }
    //   this.listPhongtroChecked = this.listPhongtroCheckedView;
    // } else {
          // for (let j = 0; j < this.listPhongtroChecked.length; j++) {
          //   if (this.listPhongtroChecked[j].id === this.listPhongtroCheckedView[i].id) {
          //     this.listPhongtroChecked.splice(j, 1);
          //     this.listPTNotAcceptView[i] = false;
          //     break;
          //   }
          // }
      for (let i = 0; i < this.listPhongtroChecked.length; i++) {
        this.listPTNotAcceptView[i] = false;
        if (this.listPTNotAccept[i]) {
          this.ptService.xetduyetPT(i, 0)
            .then(resp => {
              this.listPhongtroChecked = resp;
              this.listPhongtroCheckedView = resp;
              this.listPTNotAccept[i] = false;
            })
            .catch(err => {
              console.error(`pt ${i}:`);
              console.error(err);
            });
        }
      }
    // }
  }

  fakeInit() {
    this.checkAllPT = false;
    this.listPhongtroChecked = Constants.fakeListPT;
    for (let i = 0; i < this.listPhongtroChecked.length; ++i) {
      this.listPTNotAcceptView[i] = false;
    }
  }

}
