import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AnalyticsService } from 'src/app/service/analytics/analytics.service';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { LoadingService } from '../../../service/loading/loading.service';

@Component( {
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [ './sign-up.component.scss' ]
} )
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  submitted = false;
  error = '';
  environment = environment;
  loading = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private loadingService: LoadingService,
      private analyticsService: AnalyticsService
  ) {
    // redirect to home if already logged in
    if ( this.authenticationService.currentUserValue ) {
      this.router.navigate( [ '/dashboard' ] );
    }

    this.loadingService.sharedLoading.subscribe( loading => this.loading = loading );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signUpForm.controls;
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group( {
      username: [ '', Validators.required ],
      email: [ '', Validators.compose( [ Validators.required, Validators.email ] ) ],
      password: [ '', Validators.compose( [ Validators.required, Validators.minLength( 6 ) ] ) ],
      confirmPassword: [ '', Validators.required ]
    }, {
      validator: this.MustMatch( 'password', 'confirmPassword' )
    } );
  }

  onSubmit() {
    if ( this.loading ) {
      return;
    }

    this.submitted = true;

    // stop here if form is invalid
    if ( this.signUpForm.invalid ) {
      return;
    }

    this.loadingService.setLoading( true );
    this.authenticationService.signUp( this.f.username.value, this.f.email.value, this.f.password.value )
    .pipe( first() )
    .subscribe(
        data => {
          this.analyticsService.logRegisteredUser( data ).subscribe( response => {
            console.info( 'Register Event successfully logged.' );
          } );

          this.loadingService.setLoading( false );
          this.router.navigate( [ '/signup-success' ], { queryParams: { email: data.email } } );
        },
        errorResponse => {
          if ( typeof errorResponse.error === 'string' ) {
            this.error = errorResponse.error;
          } else if ( errorResponse.statusText ) {
            this.error = errorResponse.statusText;
          }
          this.loadingService.setLoading( false );
        } );
  }

  socialLogin( social: any ) {
    if ( this.loading ) {
      return;
    }

    this.loadingService.setLoading( true );

    this.authenticationService.socialLoginRedirect( social )
    .pipe( first() )
    .subscribe(
        data => {
          window.location.href = data.loginUrl;
        },
        errorResponse => {
          if ( typeof errorResponse.error === 'string' ) {
            this.error = errorResponse.error;
          } else if ( errorResponse.statusText ) {
            this.error = errorResponse.statusText;
          }
          this.loadingService.setLoading( false );
        } );
  }

  private MustMatch( controlName: string, matchingControlName: string ) {
    return ( formGroup: FormGroup ) => {
      const control = formGroup.controls[ controlName ];
      const matchingControl = formGroup.controls[ matchingControlName ];

      if ( matchingControl.errors && !matchingControl.errors.mustMatch ) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if ( control.value !== matchingControl.value ) {
        matchingControl.setErrors( { mustMatch: true } );
      } else {
        matchingControl.setErrors( null );
      }
    };
  }
}
