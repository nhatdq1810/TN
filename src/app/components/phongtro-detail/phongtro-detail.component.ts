import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http } from '@angular/http';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { PhongtroService } from '../../services/phongtro.service';
import { TienichService } from '../../services/tienich.service';
import { UserService } from '../../services/user.service';
import { GiaodichService } from '../../services/giaodich.service';
import { Phongtro } from '../../models/phongtro';
import { User } from '../../models/user';
import { AsideComponent } from '../aside/aside.component';
import { CommentsComponent } from '../comments/comments.component';
import { ListDatcocComponent } from '../list-datcoc/list-datcoc.component';


let Constants = require('../../resources/constants');

@Component({
  selector: 'app-phongtro-detail',
  templateUrl: './phongtro-detail.component.html',
  styleUrls: ['./phongtro-detail.component.css']
})
export class PhongtroDetailComponent implements OnInit {

  @ViewChild('asideComponent') asideComponent: AsideComponent;
  @ViewChild('commentsComponent') commentsComponent: CommentsComponent;
  @ViewChild('confirmModal') confirmModal: ModalDirective;
  @ViewChild('listDatcocModal') listDatcocModal: ListDatcocComponent;
  private phongtro: Phongtro;
  private user: User;
  private lat: number;
  private lng: number;
  private zoom: number = 18;
  private isUserPT: boolean;
  private xoaPTSuccess: boolean;
  private xoaPTFail: boolean;
  private userThichPT: boolean;
  private isPTValid: boolean;
  private errorMsg: string;
  private listTienichIcon: Array<string>;
  private listGD: Array<any>;

  constructor(private ptService: PhongtroService, private userService: UserService, private tienichService: TienichService, private gdService: GiaodichService, private route: ActivatedRoute, private http: Http, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(!this.phongtro || this.phongtro.id !== +params['id'] ) {
        this.init();
      }
    });
    this.userService.checkLoggedIn.subscribe(result => {
      if (result) {
        this.init();
      } else {
        if (!this.isPTValid) {
          this.router.navigate(['/home']);
        } else {
          this.isUserPT = false;
          this.xoaPTFail = false;
          this.xoaPTSuccess = false;
          this.userThichPT = false;
          this.isPTValid = true;
        }
      }
    });
  }

  init() {
    window.scrollTo(0, 0);
    this.isUserPT = false;
    this.xoaPTFail = false;
    this.xoaPTSuccess = false;
    this.listTienichIcon = Constants.listTienichIcon;
    let id: number;
    this.route.params.forEach((params: Params) => {
      id = +params['id'];
    });
    this.ptService.layPhongtro(id)
      .then(pt => {
        this.phongtro = pt;
        this.getLatLng();
        this.initUserPT();
        this.isPTValid = true;
        if (this.phongtro.duyet === 0 || this.phongtro.duyet === -1 || this.phongtro.an === 1) {
          if (!this.isUserPT) {
            this.router.navigate(['404']);
          } else {
            this.isPTValid = false;
            if (+this.phongtro.an === 1) {
              this.errorMsg = 'Phòng trọ bị ẩn';
            }
            if (+this.phongtro.duyet === 0) {
              this.errorMsg = 'Phòng trọ chưa được kiểm duyệt';
            }
            if (+this.phongtro.duyet === -1) {
              this.errorMsg = 'Phòng trọ không được kiểm duyệt';
            }
          }
        }
        this.ptService.layLuotThichPhongtro(id)
          .then(result => {
            this.phongtro.thich = +result;
          }).catch(err => {
            console.error(err);
            this.phongtro.thich = 0;
          });
        this.userService.layThongtinUserID(this.phongtro.userID)
          .then((usr: User) => {
            this.user = usr;
            let email = this.user.email.split('fb-');
            if (email.length > 1) {
              this.user.email = email[1];
            } else {
              email = this.user.email.split('gg-');
              if (email.length > 1) {
                this.user.email = email[1];
              }
            }
          });

      })
      .catch(err => {
        console.error(err);
        this.router.navigate(['/404']);
      });
    let currentMonth = Constants.getCurrentDate().split('/')[1];
    this.gdService.layGDTheoPhongtro(id, currentMonth)
      .then(result => {
        this.listGD = result;
      })
      .catch(err => {
        console.error(err);
        this.listGD = [];
      });
  }

  initUserPT() {
    if (this.userService.user) {
      if (this.userService.user.id === this.phongtro.userID) {
        this.isUserPT = true;
      } else {
        this.isUserPT = false;
        this.ptService.kiemtraUserThichPhongtro(this.phongtro.id, this.userService.user.id)
          .then(result => {
            if (result === 'success') {
              this.userThichPT = true;
            } else {
              this.userThichPT = false;
            }
          }).catch(err => {
            console.error(err);
            this.userThichPT = false;
          });
      }
    } else {
      this.isUserPT = false;
    }
  }

  getLatLng() {
    let url = `${Constants.geocodeUrl}${this.phongtro.diachi},Việt Nam`;

    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(resp => {
        let location = resp.results[0].geometry.location;
        this.lat = location.lat;
        this.lng = location.lng;
      });
  }

  socialShare(socialName) {
    if(socialName === 'google') {
      let path = window.location.href.replace(/localhost/gi, '127.0.0.1');
      let currentHref = encodeURIComponent(path);
      window.open('https://plus.google.com/share?url=' + currentHref, '', 'height=550,width=550,left=100,top=100,menubar=0');
    }
    if(socialName === 'facebook') {
      let path = window.location.href.replace(/localhost/gi, '127.0.0.1');
      let currentHref = encodeURIComponent(path);
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + currentHref, '', 'height=550,width=550,left=100,top=100,menubar=0');
    }
  }

  likePT() {
    if (this.userService.user && !this.isUserPT) {
      if (!this.userThichPT) {
        this.ptService.thichPhongtro(this.phongtro.id, this.userService.user.id)
          .then(result => {
            if (result === 'success') {
              this.phongtro.thich++;
              this.userThichPT = true;
            }
          }).catch(err => {
            console.error(this.phongtro.id + ': ' + err);
          });
      } else {
        this.ptService.boThichPhongtro(this.phongtro.id, this.userService.user.id)
          .then(result => {
            if (result === 'success') {
              if (this.phongtro.thich > 0) {
                this.phongtro.thich--;
              }
              this.userThichPT = false;
            }
          }).catch(err => {
            console.error(err);
          });
      }
    }
  }

  showConfirmModal(){
    this.xoaPTSuccess = false;
    this.xoaPTFail = false;
    this.confirmModal.show();
  }

  anPT() {
    this.ptService.anPT(this.phongtro.id, 1)
      .then(result => {
        if(this.phongtro.duyet === 1 && this.isPTValid) {
          this.isPTValid = false;
          this.errorMsg = 'Phòng trọ bị ẩn';
        }
        this.phongtro.an = 1;
      })
      .catch(err => {
        console.error(err);
      });
  }

  hienPT() {
    this.ptService.anPT(this.phongtro.id, 0)
      .then(result => {
        if(this.phongtro.duyet === 1 && !this.isPTValid) {
          this.isPTValid = true;
        }
        this.phongtro.an = 0;
      })
      .catch(err => {
        console.error(err);
      });
  }

  editPT() {
    this.ptService.currentPT = this.phongtro;
    this.router.navigate(['/phongtro/create', { formInfo: 'edit' }]);
  }

  xoaPT() {
    this.ptService.xoaPhongtro(this.phongtro.userID, this.phongtro.id)
      .then(listPT => {
        this.xoaPTSuccess = true;
        this.xoaPTFail = false;
        setTimeout(() => {
          this.router.navigate(['/home']);
          this.confirmModal.hide();
        }, 2000);
      })
      .catch(err => {
        console.error(err);
        this.xoaPTSuccess = false;
        this.xoaPTFail = true;
        setTimeout(() => {
          this.confirmModal.hide();
        }, 2000);
      });
  }

  showListDatcoc() {
    this.listDatcocModal.showModal();
  }
}
