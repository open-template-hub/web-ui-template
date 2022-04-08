import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLS } from 'src/app/data/navigation/navigation.data';
import { AnalyticsService } from 'src/app/service/analytics/analytics.service';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { ToastService } from 'src/app/service/toast/toast.service';
import { TwoFactorCodeService } from 'src/app/service/two-factor-code/two-factor-code.service';

@Component( {
  selector: 'app-edit-security',
  templateUrl: './edit-security.component.html',
  styleUrls: [ './edit-security.component.scss' ]
} )
export class EditSecurityComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  loading = false;

  totalTime;
  timePassed = 0;
  timeLeft;
  timerInterval = null;

  expiry;

  twoFactorVerificationState: 'request' | 'verify' | 'verified' | 'expired';

  submittedPhoneNumber: string;

  maskedPhoneNumberOptions = {
    beginningLengthThreshold: 3,
    lastLengthThreshold: 2
  };

  events: any[] = [];

  skip = 0;

  constructor(
      private fromBuilder: FormBuilder,
      private toastService: ToastService,
      private twoFactorCodeService: TwoFactorCodeService,
      private analyticsService: AnalyticsService,
      private authenticationService: AuthenticationService,
      private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.fromBuilder.group( {
      phoneNumber: [ '' ],
      verificationCode: [ '' ]
    } );

    this.authenticationService.getSubmittedPhoneNumber().subscribe( response => {
      if ( response.phoneNumber ) {
        this.submittedPhoneNumber = response.phoneNumber;
        this.twoFactorVerificationState = 'verified';
      } else {
        this.twoFactorVerificationState = 'request';
      }
    } );
  }

  ngOnDestroy(): void {
    clearInterval( this.timerInterval );
  }

  startTimer() {
    this.timerInterval = setInterval( () => {
      this.timePassed += 1;
      this.timeLeft = this.totalTime - this.timePassed;

      if ( this.timeLeft === 0 ) {
        clearInterval( this.timerInterval );
        this.toastService.error( 'Time has expired' );
        this.twoFactorVerificationState = 'expired';
      }
    }, 1000 );
  }

  onPhoneNumberSubmit() {
    if ( this.loading ) {
      return;
    }

    this.submitted = true;

    const phoneNumberErrorMessage = 'Please provide a valid phone number';

    if ( this.form.controls.phoneNumber.value === '' ) { // TODO: add regex phone number control
      if ( this.form.controls.phoneNumber.invalid ) {
        this.toastService.error( phoneNumberErrorMessage );
      }
      return;
    }

    if ( this.twoFactorVerificationState === 'request' ) {
      this.submitPhoneNumber();
    } else if ( this.twoFactorVerificationState === 'verify' ) {
      this.verifyPhoneNumber();
    }
  }

  submitPhoneNumber() {
    this.twoFactorCodeService.submitPhoneNumber(
        this.form.controls.phoneNumber.value
    ).subscribe(
        ( response ) => {
          this.totalTime = undefined;
          this.timePassed = 0;
          this.timeLeft = undefined;

          this.formatAndSetTime( response.expire );
          this.form.controls.phoneNumber.disable();
          this.twoFactorVerificationState = 'verify';
          this.startTimer();
          this.toastService.success( 'Code sent to your phone number' );
        }
    );
  }

  retry() {
    this.submitPhoneNumber();
  }

  formatAndSetTime( expiry: string ) {
    const expireDate = new Date( +expiry );
    const currentDate = new Date();

    const diff = Math.floor( ( expireDate.getTime() - currentDate.getTime() ) / 1000 );
    this.totalTime = diff;
    this.timeLeft = diff;
  }

  verifyPhoneNumber() {
    this.twoFactorCodeService.verify(
        this.form.controls.verificationCode.value,
        true
    ).subscribe(
        () => {
          this.analyticsService.logSubmitPhoneNumberEvent().subscribe();
          this.twoFactorVerificationState = 'verified';
          this.toastService.success( 'Phone number verified' );
          this.router.navigate( [ URLS.dashboard.root ] );
        }
    );
  }

  deleteSubmittedPhoneNumber() {
    this.authenticationService.deleteSubmittedPhoneNumber().subscribe( () => {
      this.submittedPhoneNumber = undefined;
      this.twoFactorVerificationState = 'request';
      this.toastService.success( 'Submitted phone number removed' );
    } );
  }
}
