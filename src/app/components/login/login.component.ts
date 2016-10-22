import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NganhangService } from '../../services/nganhang.service';
import { Router } from '@angular/router';
import { ModalDirective, ModalOptions } from 'ng2-bootstrap/ng2-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginModal') loginModal: ModalDirective;
  @ViewChild('transferModal') transferModal: ModalDirective;
  private modalOptions: ModalOptions;
  private loginForm: string;
  private complexForm: FormGroup;

  constructor(private userService: UserService, private nghService: NganhangService, private router: Router, private fb: FormBuilder) {
    this.modalOptions = {
      ignoreBackdropClick: true
    };
    this.complexForm = this.fb.group({
      'username':['', Validators.required],
      'password':['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submitForm(value: any) {
    if(this.loginForm !== 'nganhang') {
      this.userService.login(value.username, value.password)
        .then(resp => {
          if (resp) {
            this.closeModal();
          }
        });
    } else {
      this.nghService.login(value.username, value.password)
        .then(resp => {
          if (resp) {
            this.closeModal();
            this.router.navigate(['/transfer']);
          }
        });
    }
  }

  closeModal() {
    this.loginModal.hide();
  }

  showModal(loginForm: string) {
    this.loginForm = loginForm;
    this.loginModal.show();
  }

}
