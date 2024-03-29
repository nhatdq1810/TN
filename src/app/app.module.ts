let Constants = require('./resources/constants');
import './resources/rxjs-extensions';
import { UserService } from './services/user.service';
import { PhongtroService } from './services/phongtro.service';
import { LoggedInService } from './services/logged-in.service';
import { NganhangService } from './services/nganhang.service';
import { GiaodichService } from './services/giaodich.service';
import { CommentService } from './services/comment.service';
import { AuthService } from './services/auth.service';
import { TienichService } from './services/tienich.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AccordionModule, ModalModule, AlertModule, DropdownModule, DatepickerModule, TypeaheadModule, PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { routing } from './app.routing';
import { Nouislider } from 'ng2-nouislider';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { RlTagInputModule } from 'angular2-tag-input';

import { LoopObjectPipe } from './pipes/loop-object.pipe';
import { PhonePipe } from './pipes/phone.pipe';

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
import { ListDatcocComponent } from './components/list-datcoc/list-datcoc.component';
import { AdminComponent } from './components/admin/admin.component';
import { PtNotCheckedComponent } from './components/admin/pt-not-checked/pt-not-checked.component';
import { PtAcceptComponent } from './components/admin/pt-accept/pt-accept.component';
import { PtNotAcceptComponent } from './components/admin/pt-not-accept/pt-not-accept.component';
import { ListUserComponent } from './components/admin/list-user/list-user.component';
import { ListGdComponent } from './components/admin/list-gd/list-gd.component';
import { DetailPopupComponent } from './components/admin/detail-popup/detail-popup.component';
import { StatisticPtComponent } from './components/admin/statistic-pt/statistic-pt.component';
import { StatisticUserComponent } from './components/admin/statistic-user/statistic-user.component';
import { ConfirmPopupComponent } from './components/admin/confirm-popup/confirm-popup.component';

let toastOptions: ToastOptions = new ToastOptions({
  newestOnTop: true
});


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
    AdminComponent,
    PtNotCheckedComponent,
    PtAcceptComponent,
    PtNotAcceptComponent,
    ListUserComponent,
    ListGdComponent,
    DetailPopupComponent,
    StatisticUserComponent,
    StatisticPtComponent,
    ConfirmPopupComponent,
    ListDatcocComponent,
    LoopObjectPipe,
    PhonePipe
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
    PaginationModule,
    ChartsModule,
    RlTagInputModule,
    SlimLoadingBarModule.forRoot(),
    ToastModule.forRoot(toastOptions),
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
    AuthService,
    TienichService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
