import { Component, ViewContainerRef } from '@angular/core';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private viewContainerRef: ViewContainerRef;
  private admin: boolean;

  public constructor(private router: Router, viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
    this.router.events.subscribe(event => {
      if (event.url.indexOf('admin') > -1) {
        this.admin = true;
      } else {
        this.admin = false;
      }
    });
  }
}
