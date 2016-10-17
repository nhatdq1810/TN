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
  private checkboxValue: boolean;

  constructor(private fb: FormBuilder, private ptService: PhongtroService, private router: Router) {
    this.complexForm = this.fb.group({
      'giatien': 500000,
      'truong': '',
      'nganh': '',
      // , Validators.compose([Validators.minLength(5), Validators.maxLength(10)])],
      'gioitinh': 'nam'
    });
    this.sliderValue = [500000, 5000000];
    this.checkboxValue = true;
  }

  ngOnInit(){
  }

  setCheckboxValue() {
    this.checkboxValue = !this.checkboxValue;
  }

  submitForm(value: any){
    this.ptService.timkiemPhongtro(value)
      .then((result: string) => {
        if (result === 'success') {
          this.router.navigate(['/search/result']);
        }
      });
  }

}
