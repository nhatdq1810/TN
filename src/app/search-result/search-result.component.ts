import { Component, OnInit, EventEmitter } from '@angular/core';
import { Phongtro } from '../models/phongtro';
import { PhongtroService } from '../services/phongtro.service';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  private hasBaseDropZoneOver: boolean = false;
  private options: Object;
  private previewData: any;
  private uploadEvents: EventEmitter<any>;
  private listPT: Phongtro[];

  constructor(private ptService: PhongtroService) {
  }

  ngOnInit() {
    this.options = {
      url: 'http://localhost:8080/trosv/api/phongtro/hinhanh',
      filterExtensions: true,
      allowedExtensions: ['jpg', 'jpeg', 'png'],
      data: {id: 1},
      autoUpload: false,
      previewUrl: true
    };

    this.uploadEvents = new EventEmitter();
    this.previewData = null;
    this.listPT = this.ptService.listPT;
    this.listPT.forEach((value, index) => {
      console.log(value);
    })
  }

  handlePreviewData(data: any): void {
    this.previewData = data;
  }

  startUpload() {
    this.uploadEvents.emit('startUpload');
  }

  fileOverBase(e: any): void{
    this.hasBaseDropZoneOver = e;
  }

  deleteImage(): void{
    this.previewData = null;
    this.hasBaseDropZoneOver = false;
  }
}
