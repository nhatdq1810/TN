import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  private search: any;

  constructor(private fb: FormBuilder, private userService: UserService, private ptService: PhongtroService) {
    this.complexForm = this.fb.group({
      'truong': null,
      'lastName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'gender': [null, Validators.required],
      'price': 1000000
    });
    this.sliderValue = [1000000, 2500000];
    this.ptService.getListPhongtro().subscribe((listPT: Phongtro[]) => {
      this.search = (text$: Observable<string>) => {
        text$
          .debounceTime(200)
          .map(term => term === '' ? [] : listPT.filter(phongtro => {
            return new RegExp(term, 'gi').test(phongtro.truong);
          }))
      }
    });
  }

  ngOnInit(){
    this.selectedTruong = '';
  }

  submitForm(value: any){
    console.log(value);
    // this.userService.layThongtinUser('nhat');
  }

}
