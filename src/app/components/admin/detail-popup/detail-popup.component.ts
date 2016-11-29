import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app-detail-popup',
  templateUrl: './detail-popup.component.html',
  styleUrls: ['./detail-popup.component.css']
})
export class DetailPopupComponent implements OnInit {

  @ViewChild('detailPopup') detailPopup: ModalDirective;
  @Input() info: any;
  @Input() typeInfo: string;

  constructor() {
  }

  ngOnInit() {
  }

  init() {

  }

  showPopup() {
    this.detailPopup.show();
  }

  closePopup() {
    this.detailPopup.hide();
  }

}
