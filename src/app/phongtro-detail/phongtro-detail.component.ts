import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PhongtroService } from '../services/phongtro.service';
import { Phongtro } from '../models/phongtro';

@Component({
  selector: 'app-phongtro-detail',
  templateUrl: './phongtro-detail.component.html',
  styleUrls: ['./phongtro-detail.component.css']
})
export class PhongtroDetailComponent implements OnInit {

  private phongtro: Phongtro;

  constructor(private ptService: PhongtroService, private route: ActivatedRoute) {
    this.init();
  }

  init() {
    let id: number;
    this.route.params.forEach((params: Params) => {
      id = +params['id'];
    })
    this.ptService.layPhongtro(id).then((pt: Phongtro) => {
      this.phongtro = pt;
    });
  }

  ngOnInit() {
    console.log(this.phongtro);
  }

}
