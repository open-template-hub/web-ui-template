import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/page/home/home.component';
import { LoginComponent } from './component/page/login/login.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthRequestInterceptor } from './interceptor/auth/auth-request.interceptor';
import { AuthResponseInterceptor } from './interceptor/auth/auth-response.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';

import { DashboardComponent } from './component/page/dashboard/dashboard.component';
import { SignUpComponent } from './component/page/sign-up/sign-up.component';
import { SignUpSuccessComponent } from './component/page/sign-up-success/sign-up-success.component';
import { VerifyAccountComponent } from './component/page/verify-account/verify-account.component';
import { LandingLayoutComponent } from './component/layout/landing-layout/landing-layout.component';
import { DashboardLayoutComponent } from './component/layout/dashboard-layout/dashboard-layout.component';
import { ResetPasswordComponent } from './component/page/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './component/page/forget-password/forget-password.component';
import { LandingLayoutTopNavComponent } from './component/nav/landing-layout-top-nav/landing-layout-top-nav.component';
import { DashboardLayoutSideNavComponent } from './component/nav/dashboard-layout-side-nav/dashboard-layout-side-nav.component';
import { BottomNavComponent } from './component/nav/bottom-nav/bottom-nav.component';
import { FooterComponent } from './component/nav/footer/footer.component';
import { Card1Component } from './component/common/card/card1/card1.component';
import { Button1Component } from './component/common/button/button1/button1.component';
import { Button2Component } from './component/common/button/button2/button2.component';
import { SplashLayoutComponent } from './component/layout/splash-layout/splash-layout.component';
import { CallbackComponent } from './component/page/callback/callback.component';
import { SocialButtonComponent } from './component/common/button/social-button/social-button.component';
import { environment } from '../environments/environment';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WelcomeComponent } from './component/page/dashboard/welcome/welcome.component';
import { LabelDataComponent } from './component/common/block/label-data/label-data.component';
import { DashboardLayoutTopNavComponent } from './component/nav/dashboard-layout-top-nav/dashboard-layout-top-nav.component';
import { ProfileComponent } from './component/page/dashboard/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    SignUpComponent,
    SignUpSuccessComponent,
    VerifyAccountComponent,
    LandingLayoutComponent,
    DashboardLayoutComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    LandingLayoutTopNavComponent,
    DashboardLayoutSideNavComponent,
    BottomNavComponent,
    FooterComponent,
    Card1Component,
    Button1Component,
    Button2Component,
    SplashLayoutComponent,
    CallbackComponent,
    SocialButtonComponent,
    WelcomeComponent,
    LabelDataComponent,
    DashboardLayoutTopNavComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthRequestInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthResponseInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
  ) {

    const http = httpLink.create(
      {
        uri: `${environment.basicInfoServerUrl}/graphql`
      });

    const cache = new InMemoryCache();
    apollo.create({
      link: http,
      cache
    });
  }

}
