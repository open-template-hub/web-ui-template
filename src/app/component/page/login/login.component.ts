import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { LoadingService } from '../../../service/loading/loading.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  environment = environment;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }

    this.loadingService.sharedLoading.subscribe(loading => this.loading = loading);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false, Validators.required]
    });

    // get return url from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loading) {
      return;
    }

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loadingService.setLoading(true);
    this.authenticationService.login(this.f.username.value, this.f.password.value, this.f.rememberMe.value)
      .pipe(first())
      .subscribe(
        () => {
          this.loadingService.setLoading(false);
          this.router.navigate([this.returnUrl]);
        },
        errorResponse => {
          if (typeof errorResponse.error === 'string') {
            this.error = errorResponse.error;
          } else if (errorResponse.statusText) {
            this.error = errorResponse.statusText;
          }
          this.loadingService.setLoading(false);
        });
  }

  socialLogin(social: any) {
    if (this.loading) {
      return;
    }

    this.loadingService.setLoading(true);

    this.authenticationService.socialLoginRedirect(social)
      .pipe(first())
      .subscribe(
        data => {
          this.loadingService.setLoading(false);
          window.location.href = data.loginUrl;
        },
        errorResponse => {
          if (typeof errorResponse.error === 'string') {
            this.error = errorResponse.error;
          } else if (errorResponse.statusText) {
            this.error = errorResponse.statusText;
          }
          this.loadingService.setLoading(false);
        });
  }
}
