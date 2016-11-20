let Constants = require('./resources/constants');
import './resources/rxjs-extensions';
import { UserService } from './services/user.service';
import { PhongtroService } from './services/phongtro.service';
import { LoggedInService } from './services/logged-in.service';
import { NganhangService } from './services/nganhang.service';
import { GiaodichService } from './services/giaodich.service';
import { CommentService } from './services/comment.service';
import { AuthService } from './services/auth.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AccordionModule, ModalModule, AlertModule, DropdownModule, DatepickerModule, TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { routing } from './app.routing';
import { Nouislider } from 'ng2-nouislider';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { ImageCropperComponent } from 'ng2-img-cropper';

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
import { TransferMoneyComponent } from './components/transfer-money/transfer-money.component';
import { RegisterComponent } from './components/register/register.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { PhongtroUserComponent } from './components/phongtro-user/phongtro-user.component';
import { AdminComponent } from './components/admin/admin.component';


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
    AsideComponent,
    TransferMoneyComponent,
    RegisterComponent,
    GridListComponent,
    UserInfoComponent,
    PhongtroUserComponent,
    ImageCropperComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AccordionModule,
    routing,
    ModalModule,
    AlertModule,
    DropdownModule,
    DatepickerModule,
    TypeaheadModule,
    AgmCoreModule.forRoot({
      apiKey: Constants.googleApiKey
    })
  ],
  providers: [
    AUTH_PROVIDERS,
    UserService,
    PhongtroService,
    LoggedInService,
    NganhangService,
    GiaodichService,
    CommentService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
