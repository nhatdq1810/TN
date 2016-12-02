import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private viewContainerRef: ViewContainerRef;
  private admin: boolean;

  public constructor(private toastr: ToastsManager, viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
    this.toastr.setRootViewContainerRef(viewContainerRef);
    if(window.location.href.indexOf('admin') > -1) {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }
}
