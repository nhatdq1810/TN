import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PhongtroService } from '../../services/phongtro.service';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Phongtro } from '../../models/phongtro';

let Constants = require('../../resources/constants');

@Component({
  selector: 'app-phongtro-user',
  templateUrl: './phongtro-user.component.html',
  styleUrls: ['./phongtro-user.component.css']
})
export class PhongtroUserComponent implements OnInit {

  private listPT: Array<Phongtro> = [];
  private ptXoa: any;
  private successMsg: Array<Object>;
  private xoaPTSuccess: boolean;
  @ViewChild('confirmModal') confirmModal: ModalDirective;

  constructor(private userService: UserService, private ptService: PhongtroService, private router: Router) {
    this.init();
    // this.fakeInit();
  }

  ngOnInit() {
    this.userService.checkLoggedIn.subscribe(result => {
      if(result) {
        this.init();
        // this.fakeInit();
      }
    })
  }

  init() {
    this.successMsg = [{
      msg: ''
    }];
    this.xoaPTSuccess = false;
    if(this.userService.user) {
      this.ptService.layPhongtroUser(this.userService.user.id)
        .then(listPT => {
          this.listPT = listPT;
        })
        .catch(err => {
          console.error(err);
          this.listPT = [];
        });
    } else {
      this.userService.checkLoggedIn.subscribe(result => {
        if (result) {
          this.ptService.layPhongtroUser(this.userService.user.id)
            .then(listPT => {
              this.listPT = listPT;
            })
            .catch(err => {
              console.error(err);
              this.listPT = [];
            });
        }
      });
    }

  }

  editPT(pt) {
    this.ptService.currentPT = pt;
    this.router.navigate(['/phongtro/create', {formInfo: 'edit'}]);
  }

  showConfirm(pt) {
    this.ptXoa = pt;
    this.confirmModal.show();
  }

  xoaPT() {
    this.ptService.xoaPhongtro(this.userService.user.id, this.ptXoa.id)
      .then(listPT => {
        if(listPT) {
          this.listPT.forEach((pt, index) => {
            if (pt.id === this.ptXoa.id) {
              this.listPT.splice(index, 1);
            }
          });
          this.successMsg = [{
            msg: 'Xóa phòng trọ thành công !'
          }];
          this.xoaPTSuccess = true;
          window.scrollTo(0, 0);
        }
      })
      .catch(err => {
        console.error(err);
        this.xoaPTSuccess = false;
      });
  }

  closeAlert() {
    this.successMsg.splice(0, 1);
  }

  fakeInit() {
    this.listPT = Constants.fakeListPT;
    this.userService.user = Constants.fakeUser;
  }

}
