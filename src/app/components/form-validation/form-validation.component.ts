import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { PhongtroService } from '../../services/phongtro.service';
import { Phongtro } from '../../models/phongtro';


@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit {

  private complexForm: FormGroup;
  private sliderValue: number[];

  constructor(private fb: FormBuilder, private ptService: PhongtroService, private router: Router) {
    this.complexForm = this.fb.group({
      'giatien': 500000,
      'truong': '',
      'nganh': '',
      'gioitinh': ''
    });
    this.sliderValue = [500000, 5000000];
  }

  ngOnInit(){
  }

  submitForm(value: any){
    value.truong.toLowerCase();
    value.nganh.toLowerCase();
    value.tiencoc_min = 0;
    value.tiencoc_max = 5000000;
    value.dientich_min = 5;
    value.dientich_max = 20;
    value.giatien_min = value.giatien[0];
    value.giatien_max = value.giatien[1];
    delete value.giatien;
    value.khoa = '';
    value.wifi = -1;
    value.chu = -1;
    this.ptService.searchTerm = value;
    this.ptService.listPT = [];
    this.router.navigate(['/search/result']);
  }

}
