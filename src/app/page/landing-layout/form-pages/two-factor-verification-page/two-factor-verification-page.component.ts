import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { URLS } from 'src/app/data/navigation/navigation.data';
import { AnalyticsService } from 'src/app/service/analytics/analytics.service';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { BusinessLogicService } from 'src/app/service/business-logic/business-logic.service';
import { FileStorageService } from 'src/app/service/file-storage/file-storage.service';
import { InformationService } from 'src/app/service/information/information.service';
import { ToastService } from 'src/app/service/toast/toast.service';
import { TwoFactorCodeService } from 'src/app/service/two-factor-code/two-factor-code.service';
import { environment } from 'src/environments/environment';
import { environmentCommon } from 'src/environments/environment-common';

@Component({
  selector: 'app-two-factor-verification-page',
  templateUrl: './two-factor-verification-page.component.html',
  styleUrls: ['./two-factor-verification-page.component.scss']
})
export class TwoFactorVerificationPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  returnUrl: string;

  environment = environment;
  environmentCommon = environmentCommon;

  totalTime;
  timePassed = 0;
  timeLeft;
  timerInterval = null;

  loading = false;
  disabled = false;

  URLS = URLS;

  appHeroContents = [ {text: $localize `:@@loginPage.appHero:Welcome`, level: 1} ];

  showMoreToggle = false;

  preAuthToken: string;
  expiry: string;
  maskedPhoneNumber: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private businessLogicService: BusinessLogicService,
      private informationService: InformationService,
      private fileStorageService: FileStorageService,
      private toastService: ToastService,
      private analyticsService: AnalyticsService,
      private twoFactorCodeService: TwoFactorCodeService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group( {
      verificationCode: [ '', Validators.required ]
    } );

    // get return url from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || this.URLS.dashboard.root;

    const preAuthToken = this.authenticationService.preAuthTokenValue;
    this.preAuthToken = preAuthToken.preAuthToken;
    this.expiry = preAuthToken.expiry;
    this.maskedPhoneNumber = preAuthToken.maskedPhoneNumber;

    this.formatAndSetTime( this.expiry );
    this.startTimer()
  }

  formatAndSetTime( expiry: string ) {
    const expireDate = new Date( +expiry );
    const currentDate = new Date();

    const diff =  Math.floor( ( expireDate.getTime() - currentDate.getTime() ) / 1000 );
    this.totalTime = diff;
    this.timeLeft = diff;
  }

  ngOnDestroy() {
    this.informationService.clearInformation();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timePassed += 1;
      this.timeLeft = this.totalTime - this.timePassed;
  
      if( this.timeLeft <= 0 ) { 
        clearInterval( this.timerInterval );
      }
    }, 1000);
  }

  sendCode() {
    this.twoFactorCodeService.loginVerify(
      this.form.controls.verificationCode.value,
      this.preAuthToken
    ).subscribe(
      currentUser => {
        // this.analyticsService.logSubmitPhoneNumberEvent().subscribe();
        clearInterval( this.timerInterval ); 
        this.authenticationService.setLoginParams( currentUser, false );
        this.router.navigate( [ URLS.dashboard.root ] );
      }
    )
  }

  onSubmit() {
    if ( this.loading ) {
      return;
    }

    this.submitted = true;

    const errorMessages = {
      twoFactorCode: `Please provide valid two factor code`,
    };

    if ( this.form.invalid ) {
      for ( const control in this.form.controls ) {
        if ( this.form.controls[ control ].invalid ) {
          this.toastService.error( errorMessages[ control ], '' );
        }
      }
      return;
    }
    this.sendCode();
  }

  private loginWithoutOpeningDashboard() {
    // Special case for initialization (if return url is else than dashboard)
    this.businessLogicService.me()
    .subscribe( userInfo => {
          this.router.navigateByUrl( this.returnUrl );
          if ( !userInfo.payload ) {
            this.businessLogicService.createMyInfo()
            .subscribe( () => {
                  this.router.navigate( [ URLS.maintenance ] );
                }
            );
          } else {
            this.fileStorageService.downloadProfileImage( userInfo.payload.profileImageId ).subscribe();
          }
        }
    );
  }
}
