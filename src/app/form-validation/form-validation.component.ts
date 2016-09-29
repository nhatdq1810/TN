import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit {

  complexForm: FormGroup;
  sliderValue: number;

  constructor(fb: FormBuilder) {
    this.complexForm = fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'gender': [null, Validators.required],
      'price': 500000
    });
    this.sliderValue = 500000;
  }

  ngOnInit(){
  }

  submitForm(value: any){
    console.log(value);
  }

}
