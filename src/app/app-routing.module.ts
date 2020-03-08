import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SignUpSuccessComponent } from './component/sign-up-success/sign-up-success.component';
import { VerifyAccountComponent } from './component/verify-account/verify-account.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signup-success', component: SignUpSuccessComponent },
  { path: 'verify-account', component: VerifyAccountComponent },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
