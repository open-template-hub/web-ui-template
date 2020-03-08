import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthRequestInterceptor } from './interceptor/auth/auth-request.interceptor';
import { AuthResponseInterceptor } from './interceptor/auth/auth-response.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './module/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SignUpSuccessComponent } from './component/sign-up-success/sign-up-success.component';
import { VerifyAccountComponent } from './component/verify-account/verify-account.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    SignUpComponent,
    SignUpSuccessComponent,
    VerifyAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
