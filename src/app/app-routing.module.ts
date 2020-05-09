import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './component/page/home/home.component';
import { LoginComponent } from './component/page/login/login.component';
import { DashboardComponent } from './component/page/dashboard/dashboard.component';
import { SignUpComponent } from './component/page/sign-up/sign-up.component';
import { SignUpSuccessComponent } from './component/page/sign-up-success/sign-up-success.component';
import { VerifyAccountComponent } from './component/page/verify-account/verify-account.component';
import { LandingLayoutComponent } from './component/layout/landing-layout/landing-layout.component';
import { DashboardLayoutComponent } from './component/layout/dashboard-layout/dashboard-layout.component';
import { ResetPasswordComponent } from './component/page/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './component/page/forget-password/forget-password.component';
import { GithubCallbackComponent } from './component/page/callback/github-callback/github-callback.component';
import { SplashLayoutComponent } from './component/layout/splash-layout/splash-layout.component';
import { FacebookCallbackComponent } from './component/page/callback/facebook-callback/facebook-callback.component';
import { DribbbleCallbackComponent } from './component/page/callback/dribbble-callback/dribbble-callback.component';
import { LinkedinCallbackComponent } from './component/page/callback/linkedin-callback/linkedin-callback.component';
import { RedditCallbackComponent } from './component/page/callback/reddit-callback/reddit-callback.component';
import { TwitchCallbackComponent } from './component/page/callback/twitch-callback/twitch-callback.component';

const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'signup', component: SignUpComponent},
      {path: 'signup-success', component: SignUpSuccessComponent},
      {path: 'verify-account', component: VerifyAccountComponent},
      {path: 'login', component: LoginComponent},
      {path: 'forget-password', component: ForgetPasswordComponent},
      {path: 'reset-password', component: ResetPasswordComponent}
    ]
  },
  {
    path: 'callback',
    component: SplashLayoutComponent,
    children: [
      {path: 'github', component: GithubCallbackComponent},
      {path: 'facebook', component: FacebookCallbackComponent},
      {path: 'dribbble', component: DribbbleCallbackComponent},
      {path: 'linkedin', component: LinkedinCallbackComponent},
      {path: 'reddit', component: RedditCallbackComponent},
      {path: 'twitch', component: TwitchCallbackComponent}
    ]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {path: '', component: DashboardComponent, canActivate: [AuthGuard]}
    ]
  },

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
