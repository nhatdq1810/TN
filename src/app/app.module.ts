let Constants = require('./resources/constants');
import './resources/rxjs-extensions';
import { UserService } from './services/user.service';
import { PhongtroService } from './services/phongtro.service';
import { LoggedInService } from './services/logged-in.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app.routing';
import { Nouislider } from 'ng2-nouislider';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CreatePhongtroComponent } from './create-phongtro/create-phongtro.component';
import { Error404Component } from './404/404.component';
import { LoginComponent } from './login/login.component';
import { PhongtroDetailComponent } from './phongtro-detail/phongtro-detail.component';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    FormValidationComponent,
    Nouislider,
    SearchResultComponent,
    CreatePhongtroComponent,
    UPLOAD_DIRECTIVES,
    Error404Component,
    LoginComponent,
    PhongtroDetailComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: Constants.googleApiKey
    })
  ],
  providers: [
    UserService,
    PhongtroService,
    LoggedInService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
