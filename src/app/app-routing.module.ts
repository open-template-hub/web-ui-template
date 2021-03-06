import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { DashboardLayoutComponent } from './component/layout/dashboard-layout/dashboard-layout.component';
import { LandingLayoutComponent } from './component/layout/landing-layout/landing-layout.component';
import { SplashLayoutComponent } from './component/layout/splash-layout/splash-layout.component';
import { CallbackComponent } from './component/page/callback/callback.component';
import { DashboardComponent } from './component/page/dashboard/dashboard.component';
import { ProfileComponent } from './component/page/dashboard/profile/profile.component';
import { WelcomeComponent } from './component/page/dashboard/welcome/welcome.component';
import { ForgetPasswordComponent } from './component/page/forget-password/forget-password.component';
import { HomeComponent } from './component/page/home/home.component';
import { LoginComponent } from './component/page/login/login.component';
import { ResetPasswordComponent } from './component/page/reset-password/reset-password.component';
import { SignUpSuccessComponent } from './component/page/sign-up-success/sign-up-success.component';
import { SignUpComponent } from './component/page/sign-up/sign-up.component';
import { VerifyAccountComponent } from './component/page/verify-account/verify-account.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'signup-success', component: SignUpSuccessComponent },
      { path: 'verify-account', component: VerifyAccountComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent }
    ]
  },
  {
    path: 'callback',
    component: SplashLayoutComponent,
    children: [
      { path: 'twitter', component: CallbackComponent, data: { social: environment.social.twitter } },
      { path: 'google', component: CallbackComponent, data: { social: environment.social.google } },
      { path: 'facebook', component: CallbackComponent, data: { social: environment.social.facebook } },
      { path: 'linkedin', component: CallbackComponent, data: { social: environment.social.linkedin } },
      { path: 'twitch', component: CallbackComponent, data: { social: environment.social.twitch } },
      { path: 'dribbble', component: CallbackComponent, data: { social: environment.social.dribbble } },
      { path: 'reddit', component: CallbackComponent, data: { social: environment.social.reddit } },
      { path: 'github', component: CallbackComponent, data: { social: environment.social.github } }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [ AuthGuard ] },
      { path: 'welcome', component: WelcomeComponent, canActivate: [ AuthGuard ] },
      { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ] }
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule( {
  imports: [ RouterModule.forRoot( routes, { scrollPositionRestoration: 'enabled' } ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
