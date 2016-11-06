import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { PhongtroService } from '../../services/phongtro.service';
import { UserService } from '../../services/user.service';
import { Phongtro } from '../../models/phongtro';
import { User } from '../../models/user';
import { AsideComponent } from '../aside/aside.component';
import { CommentsComponent } from '../comments/comments.component';


let Constants = require('../../resources/constants');

@Component({
  selector: 'app-phongtro-detail',
  templateUrl: './phongtro-detail.component.html',
  styleUrls: ['./phongtro-detail.component.css']
})
export class PhongtroDetailComponent implements OnInit {

  @ViewChild('asideComponent') asideComponent: AsideComponent;
  @ViewChild('commentsComponent') commentsComponent: CommentsComponent;
  private phongtro: Phongtro;
  private user: User;
  private lat: number;
  private lng: number;
  private zoom: number = 18;

  constructor(private ptService: PhongtroService, private userService: UserService, private route: ActivatedRoute, private http: Http, private location: Location, private router: Router) {
    // this.fakeInit();
    this.init();
  }

  init() {
    let id: number;
    this.route.params.forEach((params: Params) => {
      id = +params['id'];
    });
    if(!this.phongtro || this.phongtro.id !== id) {
      this.ptService.layPhongtro(id).then(pt => {
        this.phongtro = pt;
        this.getLatLng();
        this.userService.layThongtinUserID(this.phongtro.userID).then((usr: User) => {
          this.user = usr;
          let email = this.user.email.split('f-');
          if(email.length > 1) {
            this.user.email = email[1];
          } else {
            email = this.user.email.split('g-');
            if (email.length > 1) {
              this.user.email = email[1];
            }
          }
        })
      })
      .catch(err => {
        console.error(err);
        this.router.navigate(['/404']);
      });
    }
  }

  getLatLng() {
    let url = `${Constants.geocodeUrl}${this.phongtro.diachi},ViệtNam&key=${Constants.googleApiKey}`;

    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(resp => {
        let location = resp.results[0].geometry.location;
        this.lat = location.lat;
        this.lng = location.lng;
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.init();
    });
  }

  socialShare(socialName) {
    if(socialName === 'google') {
      let path = window.location.href.replace(/localhost/gi, '127.0.0.1');
      let currentHref = encodeURIComponent(path);
      window.open('https://plus.google.com/share?url=' + currentHref, '', 'height=550,width=525,left=100,top=100,menubar=0');
    }
    if(socialName === 'facebook') {
      let path = window.location.href.replace(/localhost/gi, '127.0.0.1');
      let currentHref = encodeURIComponent(path);
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + currentHref, '', 'height=550,width=525,left=100,top=100,menubar=0');
    }
  }

  fakeInit() {
    this.phongtro = Constants.fakePt;
    this.user = Constants.fakeUser;
    this.getLatLng();
  }
}
