import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ModalDirective, ModalOptions } from 'ng2-bootstrap/ng2-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerModal') registerModal: ModalDirective;
  @ViewChild('loginModal') loginModal: ModalDirective;
  private modalOptions: ModalOptions;
  private complexForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.modalOptions = {
      ignoreBackdropClick: true
    };
    this.complexForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'hoten': ['', Validators.required],
      'email': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submitForm(value: any) {
    // if (this.registerForm !== 'nganhang') {
    //   this.userService.register(value.username, value.password)
    //     .then(result => {
    //       if (result) {
    //         this.closeModal();
    //       }
    //     });
    // } else {
    //   this.nghService.register(value.username, value.password)
    //     .then(result => {
    //       if (result) {
    //         this.closeModal();
    //       }
    //     });
    // }
  }

  closeModal() {
    this.registerModal.hide();
  }

  showModal() {
    this.registerModal.show();
  }

}
