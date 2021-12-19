import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environmentCommon } from 'src/environments/environment-common';
import { environment } from '../../../../../environments/environment';
import { URLS } from '../../../../data/navigation/navigation.data';
import { AnalyticsService } from '../../../../service/analytics/analytics.service';
import { AuthenticationService } from '../../../../service/auth/authentication.service';
import { BusinessLogicService } from '../../../../service/business-logic/business-logic.service';
import { FileStorageService } from '../../../../service/file-storage/file-storage.service';
import { InformationService } from '../../../../service/information/information.service';
import { LoadingService } from '../../../../service/loading/loading.service';
import { ToastService } from '../../../../service/toast/toast.service';
import { WebsiteModel } from '../../../../model/website/website.model'

@Component( {
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.scss' ]
} )
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  returnUrl: string;

  environment = environment;
  environmentCommon = environmentCommon;

  loading = false;
  disabled = false;

  URLS = URLS;

  appHeroContents = [ {text: $localize `:@@loginPage.appHero:Welcome`, level: 1} ];

  websites: WebsiteModel[] = [];

  showMoreToggle = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private businessLogicService: BusinessLogicService,
      private informationService: InformationService,
      private fileStorageService: FileStorageService,
      private loadingService: LoadingService,
      private toastService: ToastService,
      private analyticsService: AnalyticsService
  ) {
    if ( this.authenticationService.currentUserValue ) {
      this.router.navigate( [ URLS.dashboard.root ] );
    }
    this.loadingService.sharedLoading.subscribe( loading => this.loading = loading );

    for ( const website in environmentCommon.website ) {
      if ( ( environmentCommon.website[ website ] as WebsiteModel )?.websiteType === 'oauth' ) {
        this.websites.push( environmentCommon.website[ website ] )
      }
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group( {
      username: [ '', Validators.required ],
      password: [ '', Validators.required ],
      rememberMe: [ true, Validators.required ]
    } );

    // get return url from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || URLS.dashboard.root;
  }

  ngOnDestroy() {
    this.informationService.clearInformation();
  }

  onSubmit() {
    if ( this.loading ) {
      return;
    }

    this.submitted = true;

    const errorMessages = {
      username: $localize `:@@loginPage.error.username:Please provide a valid username`,
      password: $localize `:@@loginPage.error.password:Please provide a valid password`,
    };

    if ( this.form.invalid ) {
      for ( const control in this.form.controls ) {
        if ( this.form.controls[ control ].invalid ) {
          this.toastService.error( errorMessages[ control ], '' );
        }
      }
      return;
    }
    this.login();
  }

  socialLogin( social: any ) {
    if ( this.loading || this.disabled ) {
      return;
    }

    this.disabled = true;

    this.authenticationService.socialLoginRedirect( social )
    .pipe( first() )
    .subscribe(
        data => {
          window.location.href = data.loginUrl;
        },
        error => {
          this.disabled = false;
        } );
  }

  private login() {
    this.authenticationService.login(
        this.form.controls.username.value,
        this.form.controls.password.value,
        this.form.controls.rememberMe.value
    ).pipe( first() )
    .subscribe(
        () => {
          const data = {
            payload: {
              message: 'Login Attempt Successful'
            },
            category: 'LOGIN'
          }

          this.analyticsService.logRegisteredUser( data ).subscribe();

          if ( this.returnUrl !== URLS.dashboard.root ) {
            this.loginWithoutOpeningDashboard();
          } else {
            this.router.navigate( [ this.returnUrl ] );
          }
        }
    );
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
