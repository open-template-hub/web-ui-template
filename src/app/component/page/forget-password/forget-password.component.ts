import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { first } from 'rxjs/operators';
import { LoadingService } from '../../../service/loading/loading.service';

@Component({
 selector: 'app-forget-password',
 templateUrl: './forget-password.component.html',
 styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

 forgetPasswordForm: FormGroup;
 submitted = false;
 error = '';
 success = false;
 loading: boolean = false;

 constructor(
  private formBuilder: FormBuilder,
  private route: ActivatedRoute,
  public router: Router,
  private authenticationService: AuthenticationService,
  private loadingService: LoadingService
 ) {
  // redirect to home if already logged in
  if (this.authenticationService.currentUserValue) {
   this.router.navigate(['/dashboard']);
  }

  this.loadingService.sharedLoading.subscribe(loading => this.loading = loading);
 }

 ngOnInit() {
  this.forgetPasswordForm = this.formBuilder.group({
   username: ['', Validators.required]
  });
 }

 // convenience getter for easy access to form fields
 get f() {
  return this.forgetPasswordForm.controls;
 }

 onSubmit() {
  if (this.loading) {
   return;
  }

  this.submitted = true;

  if (this.forgetPasswordForm.invalid) {
   return;
  }

  this.loadingService.setLoading(true);
  this.authenticationService.forgetPassword(this.f.username.value)
   .pipe(first())
   .subscribe(
    () => {
     this.success = true;
     this.loadingService.setLoading(false);
    },
    errorResponse => {
     if (typeof errorResponse.error === 'string') {
      this.error = errorResponse.error;
     } else if (errorResponse.statusText) {
      this.error = errorResponse.statusText;
     }
     this.success = false;
     this.loadingService.setLoading(false);
    });
 }
}
