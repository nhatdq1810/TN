import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private viewContainerRef: ViewContainerRef;
  private admin: boolean;

  public constructor(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
    if(window.location.href.indexOf('admin') > -1) {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }
}
