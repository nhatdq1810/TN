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
  private zoom: number;

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
      this.zoom = 18;
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
    this.phongtro = {
      id: 3,
      hinhanh: 'assets/img/index-03.jpg',
      diachi: '123 Lê Đức Thọ, Phường 15, Quận Gò Vấp, TP.Hồ Chí Minh',
      songuoi: 2,
      dientich: 2500,
      gioitinh: 'nam',
      nganh: '',
      khoa: '',
      wifi: 0,
      chu: 0,
      ghichu: '',
      userID: 1,
      tiencoc: 0,
      truong: 'PTITPTITPTITPTITPTITPTITPTITPTITPTITPTIT',
      ngaydang: '01/10/2016',
      giatien: 2000000
    };
    this.user = {
      diachi: '123 Lê Đức Thọ, Phường 15, Quận Gò Vấp, TP.Hồ Chí Minh',
      dotincay: 1,
      email: 'abc@gmail.com',
      facebook: 'https://www.facebook.com/abcabcabcabcabcabcabcabcabcabc',
      skype: 'sutrix.nhat.dangsutrix.nhat.dangsutrix.nhat.dangsutrix.nhat.dang',
      // skype: 'dangquangnhat18101994',
      hoten: 'abc',
      id: 1,
      password: '123456',
      sodt: '0123456789',
      username: 'abcd'
    };
    this.getLatLng();
    this.zoom = 18;
  }
}
