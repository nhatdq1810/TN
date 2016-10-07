import { Component, OnInit, NgZone, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  private zone: NgZone;
  private hasBaseDropZoneOver: boolean = false;
  private progress: number = 0;
  private response: any = {};
  private options: Object;
  private uploadEvents: EventEmitter<any>;
  private previewData: any;

  constructor() {
  }

  ngOnInit() {
    this.zone = new NgZone({enableLongStackTrace: false});
    this.options = {
      url: 'https://api.imgur.com/3/upload',
      calculateSpeed: true,
      customHeaders: {'Authorization': 'Client-ID f9ea705cdc1e4c9'},
      previewUrl: true
    };
    this.uploadEvents = new EventEmitter();
  }

  handleUpload(data: any): void {
    console.log(data);
    this.zone.run(() => {
      this.response = data;
      this.progress = Math.floor(data.progress.percent / 100);
    });
  }

  handlePreviewData(data: any): void {
    this.previewData = data;
  }

  // fileOverBase(e: any): void{
  //   this.hasBaseDropZoneOver = e;
  // }

  startUpload(){
    this.uploadEvents.emit('startUpload');
  }

}
