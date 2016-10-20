import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ModalDirective, ModalOptions } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginModal') loginModal: ModalDirective;
  private modalOptions: ModalOptions;

  constructor(private userService: UserService, private router: Router) {
    this.modalOptions = {
      ignoreBackdropClick: true
    }
  }

  ngOnInit() {
  }

  onSubmit(username, password) {
    this.userService.login(username, password)
    .then(result => {
      if(result) {
        this.router.navigate(['']);
      }
    })
  }

  showModal() {
    this.loginModal.show();
  }

}
