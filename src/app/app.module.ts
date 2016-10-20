let Constants = require('./resources/constants');
import './resources/rxjs-extensions';
import { UserService } from './services/user.service';
import { PhongtroService } from './services/phongtro.service';
import { LoggedInService } from './services/logged-in.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AccordionModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { routing } from './app.routing';
import { Nouislider } from 'ng2-nouislider';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormValidationComponent } from './components/form-validation/form-validation.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { CreatePhongtroComponent } from './components/create-phongtro/create-phongtro.component';
import { Error404Component } from './components/404/404.component';
import { LoginComponent } from './components/login/login.component';
import { PhongtroDetailComponent } from './components/phongtro-detail/phongtro-detail.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AsideComponent } from './components/aside/aside.component';


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
    CommentsComponent,
    AsideComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AccordionModule,
    routing,
    ModalModule,
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
