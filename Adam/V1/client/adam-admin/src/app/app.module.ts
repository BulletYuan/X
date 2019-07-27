import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { adminLteConf } from './admin-lte.conf';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { LayoutModule } from 'angular-admin-lte';
import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MoreInfoModalComponent } from './components/more-info-modal/more-info-modal.component';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    NgbModule,
    LayoutModule.forRoot(adminLteConf),
    LoadingPageModule, MaterialBarModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,

    MoreInfoModalComponent,
  ],
  entryComponents: [
    MoreInfoModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
