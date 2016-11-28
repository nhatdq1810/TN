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

  private listPTChecked: Array<any> = [];
  private listPTCheckedView: Array<any> = [];
  private listUser: Array<any> = [];
  private listPTNotAccept: Array<any> = [];
  private listPTNotAcceptView: Array<boolean> = [];
  private checkAllPT: boolean;
  private searchTerm: string;
  private isDelete: boolean;

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
        this.listPTChecked = resp;
        this.listPTCheckedView = resp;
        this.listPTCheckedView.forEach((pt, index) => {
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

  wantDelete() {
    this.isDelete = !this.isDelete;
    this.checkAllPT = false;
    // if (this.isDelete) {
    //   for (let i = 0; i < this.listPhongtroNotChecked.length; ++i) {
    //     this.listPTAccept[i] = false;
    //   }
    // } else {
    //   for (let i = 0; i < this.listPhongtroNotChecked.length; ++i) {
    //     this.listPTDelete[i] = false;
    //   }
    // }
  }

  searchPT(term: string) {
    if(term && term !== '') {
      this.listPTCheckedView = [];
      for (let i = 0; i < this.listPTChecked.length; i++) {
        for (let propPT in this.listPTChecked[i]) {
          if (this.listPTChecked[i][propPT].toString().indexOf(term) > -1) {
            this.listPTCheckedView.push(this.listPTChecked[i]);
            break;
          } else if(this.listUser[this.listPTChecked[i].userID].username.indexOf(term) > -1) {
            this.listPTCheckedView.push(this.listPTChecked[i]);
            break;
          }
        }
      }
    } else {
      this.listPTCheckedView = this.listPTChecked;
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
    // if(this.listPTChecked.length === this.listPTCheckedView.length) {
    //   this.listPTCheckedView = [];
    //   for (let i = 0; i < this.listPTNotAcceptView.length; i++) {
    //     if (!this.listPTNotAcceptView[i]) {
    //       this.listPTCheckedView.push(this.listPTChecked[i]);
    //     } else {
    //       this.listPTNotAcceptView[i] = false;
    //     }
    //   }
    //   this.listPTChecked = this.listPTCheckedView;
    // } else {
          // for (let j = 0; j < this.listPTChecked.length; j++) {
          //   if (this.listPTChecked[j].id === this.listPTCheckedView[i].id) {
          //     this.listPTChecked.splice(j, 1);
          //     this.listPTNotAcceptView[i] = false;
          //     break;
          //   }
          // }
      for (let i = 0; i < this.listPTChecked.length; i++) {
        this.listPTNotAcceptView[i] = false;
        if (this.listPTNotAccept[i]) {
          this.ptService.xetduyetPT(i, 0)
            .then(resp => {
              this.listPTChecked = resp;
              this.listPTCheckedView = resp;
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
    this.listPTChecked = Constants.fakeListPT;
    for (let i = 0; i < this.listPTChecked.length; ++i) {
      this.listPTNotAcceptView[i] = false;
    }
  }

}
