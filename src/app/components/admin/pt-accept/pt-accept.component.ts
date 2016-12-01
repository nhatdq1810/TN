import { Component, OnInit } from '@angular/core';
import { PhongtroService } from '../../../services/phongtro.service';
import { UserService } from '../../../services/user.service';

let Constants = require('../../../resources/constants');

@Component({
  selector: 'app-pt-accept',
  templateUrl: './pt-accept.component.html',
  styleUrls: ['./pt-accept.component.css']
})
export class PtAcceptComponent implements OnInit {

  private listPTChecked: Array<any> = [];
  private listPTCheckedView: Array<any> = [];
  private listUser: Array<any> = [];
  private listPTNotAccept: Array<any> = [];
  private listPTNotAcceptView: Array<boolean> = [];
  private checkAllPT: boolean;
  private searchTerm: string;

  constructor(private ptService: PhongtroService, private userService: UserService) {
    // this.init();
    this.fakeInit();
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

  deletePT() {
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
    if(event) {
      if(this.listPTNotAccept.indexOf(pt.id) === -1) {
        this.listPTNotAccept.push(pt.id);
      }
    } else {
      let index = this.listPTNotAccept.indexOf(pt.id);
      this.listPTNotAccept.splice(index, 1);
    }
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

  denyPT() {
    this.ptService.xetduyetPT(this.listPTNotAccept, 0)
      .then(resp => {
        this.listPTChecked = resp;
        this.listPTCheckedView = resp;
        this.listPTNotAccept = [];
        this.listPTNotAcceptView = [];
        this.checkAllPT = false;
        for (let i = 0; i < this.listPTChecked.length; i++) {
          this.listPTNotAcceptView.push(false);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  fakeInit() {
    this.checkAllPT = false;
    this.listPTChecked = Constants.fakeListPT;
    for (let i = 0; i < this.listPTChecked.length; ++i) {
      this.listPTNotAcceptView[i] = false;
    }
  }

}
