import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { PhongtroService } from '../services/phongtro.service';
import { Phongtro } from '../models/phongtro';

let Constants = require('../resources/constants');

@Component({
  selector: 'app-phongtro-detail',
  templateUrl: './phongtro-detail.component.html',
  styleUrls: ['./phongtro-detail.component.css']
})
export class PhongtroDetailComponent implements OnInit {

  private phongtro: Phongtro;
  private lat: number;
  private lng: number;
  private zoom: number;

  constructor(private ptService: PhongtroService, private route: ActivatedRoute, private http: Http) {
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
    });
  }

  getLatLng() {
    let addr = '864 Lê Đức Thọ, phường 16, Gò Vấp, Hồ Chí Minh';
    let url = `${Constants.geocodeUrl}${addr},ViệtNam&key=${Constants.googleApiKey}`;

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
}
