import { Component, OnInit, EventEmitter } from '@angular/core';


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

  constructor() {
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
