import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { PhongtroService } from '../../services/phongtro.service';
import { UserService } from '../../services/user.service';
import { Phongtro } from '../../models/phongtro';
import { User } from '../../models/user';

let Constants = require('../../resources/constants');

@Component({
  selector: 'app-phongtro-detail',
  templateUrl: './phongtro-detail.component.html',
  styleUrls: ['./phongtro-detail.component.css']
})
export class PhongtroDetailComponent implements OnInit {

  private phongtro: Phongtro;
  private user: User;
  private lat: number;
  private lng: number;
  private zoom: number = 18;

  constructor(private ptService: PhongtroService, private userService: UserService, private route: ActivatedRoute, private http: Http) {
    // this.fakeInit();
    this.init();
  }

  init() {
    let id: number;
    this.route.params.forEach((params: Params) => {
      id = +params['id'];
    })
    this.ptService.layPhongtro(id).then((pt: Phongtro) => {
      this.phongtro = pt;
      this.getLatLng();
      this.userService.layThongtinUserID(this.phongtro.userID).then((usr: User) => {
        this.user = usr;
      })
    });
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
  }

  fakeInit() {
    this.phongtro = Constants.fakePt;
    this.user = Constants.fakeUser;
    this.getLatLng();
  }
}
