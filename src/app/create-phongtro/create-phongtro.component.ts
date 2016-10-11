import { Component, OnInit, EventEmitter } from '@angular/core';
import { Phongtro } from '../models/phongtro';
import { PhongtroService } from '../services/phongtro.service';

let Constants = require('../resources/constants');

@Component({
  selector: 'app-create-phongtro',
  templateUrl: './create-phongtro.component.html',
  styleUrls: ['./create-phongtro.component.css']
})
export class CreatePhongtroComponent {

  private hasBaseDropZoneOver: boolean = false;
  private options: Object;
  private previewData: any;
  private uploadEvents: EventEmitter<any>;

  constructor(private ptService: PhongtroService) {
  }

  ngOnInit() {
    this.options = {
      url: 'http://localhost:8080/trosv/api/phongtro/hinhanh',
      filterExtensions: true,
      allowedExtensions: ['jpg', 'jpeg', 'png'],
      data: { id: 6 },
      autoUpload: false,
      previewUrl: true
    };

    this.uploadEvents = new EventEmitter();
    this.previewData = null;
  }

  handlePreviewData(data: any): void {
    this.previewData = data;
  }

  startUpload() {
    this.uploadEvents.emit('startUpload');
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  deleteImage(): void {
    this.previewData = null;
    this.hasBaseDropZoneOver = false;
  }

}
