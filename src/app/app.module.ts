import './resources/rxjs-extensions';
import { UserService } from './services/user.service';
import { PhongtroService } from './services/phongtro.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CreatePhongtroComponent } from './create-phongtro/create-phongtro.component';
import { Nouislider } from 'ng2-nouislider';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader';



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
    UPLOAD_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule,
    routing
  ],
  providers: [
    UserService,
    PhongtroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
