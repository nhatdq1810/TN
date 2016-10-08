import { Component } from '@angular/core';

let Constants = require('../resources/constants');
let uploadURL = Constants.apiUrl + 'phongtro/hinhanh';

@Component({
  selector: 'app-create-phongtro',
  templateUrl: './create-phongtro.component.html',
  styleUrls: ['./create-phongtro.component.css']
})
export class CreatePhongtroComponent {

  constructor(private hasBaseDropZoneOver: boolean) {
    this.hasBaseDropZoneOver = false;
  }

}
