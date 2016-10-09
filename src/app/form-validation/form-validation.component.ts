import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';
import { PhongtroService } from '../services/phongtro.service';
import { Phongtro } from '../models/phongtro';


@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit {

  private complexForm: FormGroup;
  private sliderValue: number[];
  private selectedTruong: string;
  private searching: boolean = false;
  @Output() eventEmit = new EventEmitter();

  constructor(private fb: FormBuilder, private userService: UserService, private ptService: PhongtroService, private router: Router) {
    this.complexForm = this.fb.group({
      'giatien': 1000000,
      'truong': '',
      'nganh': '',
      // , Validators.compose([Validators.minLength(5), Validators.maxLength(10)])],
      'gioitinh': ''
    });
    this.sliderValue = [1000000, 2500000];
  }

  ngOnInit(){
  }

  submitForm(value: any){
    this.ptService.timkiemPhongtro(value)
      .then((result: string) => {
        if(result === 'success') {
          this.router.navigate(['/search/result']);
        }
      });
  }

}
