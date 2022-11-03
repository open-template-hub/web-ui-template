import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { BRAND } from '../../../data/brand/brand.data';
import { URLS } from '../../../data/navigation/navigation.data';
import { PremiumProducts } from '../../../data/premium-products/premium-product.data';
import { AnalyticsService } from '../../../service/analytics/analytics.service';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { BusinessLogicService } from '../../../service/business-logic/business-logic.service';
import { InformationService } from '../../../service/information/information.service';
import { PaymentService } from '../../../service/payment/payment.service';
import { ProductService } from '../../../service/product/product.service';

@Component( {
  selector: 'app-callback-page',
  templateUrl: './callback-page.component.html',
  styleUrls: [ './callback-page.component.scss' ],
} )
export class CallbackPageComponent implements OnInit {
  oauth: any;
  payment: any;

  website: any;

  error = '';

  URLS = URLS;
  BRAND = BRAND;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private informationService: InformationService,
      private paymentService: PaymentService,
      private productService: ProductService,
      private businessLogicService: BusinessLogicService,
      private analyticsService: AnalyticsService
  ) {
    // Intentionally blank
  }

  ngOnInit(): void {
    this.oauth = this.route.snapshot.data.oauth;
    this.payment = this.route.snapshot.data.payment;

    if ( this.payment ) {
      const status = this.route.snapshot.queryParamMap.get( 'status' );
      const eventId = this.route.snapshot.queryParamMap.get( 'id' );
      const transactionId =
          this.route.snapshot.queryParamMap.get( 'transaction_id' );
      this.paymentCallback( this.payment, status, eventId, transactionId );
      this.website = this.payment;
    } else {
      this.website = this.oauth;
      this.socialLoginCallback();
    }
  }

  private paymentCallback(
      paymentConfig: string,
      status: string,
      eventId: string,
      transactionId: string
  ) {
    if ( status === 'success' ) {
      this.paymentService
      .verify( paymentConfig, transactionId, eventId )
      .subscribe(
          () => {
            this.analyticsService.logPaymentEvent( this.payment ).subscribe();

            this.informationService.setInformation(
                $localize`:@@callback.information.success:Payment succeeded`,
                'success'
            );
            this.router.navigate( [ URLS.dashboard.root ] );

            this.productService.checkProduct();
          },
          () => {
            this.informationService.setInformation(
                $localize`:@@callback.information.canceled:Payment canceled`,
                'error'
            );
            this.router.navigate( [ URLS.dashboard.root ] );
          }
      );
    } else {
      this.informationService.setInformation(
          $localize`:@@callback.information.canceled:Payment canceled`,
          'error'
      );
      this.router.navigate( [ URLS.dashboard.root ] );
    }
  }

  private socialLoginCallback() {
    const callbackParams = {
      code: undefined,
      state: undefined,
      oauth_token: undefined,
      oauth_verifier: undefined,
    };

    if ( this.oauth.callbackParams.includes( 'code' ) ) {
      if ( !this.route.snapshot.queryParamMap.has( 'code' ) ) {
        this.error = 'Please try again later';
        return;
      }
      callbackParams.code = this.route.snapshot.queryParamMap.get( 'code' );
    }

    if ( this.oauth.callbackParams.includes( 'state' ) ) {
      if ( !this.route.snapshot.queryParamMap.has( 'state' ) ) {
        this.error = 'Please try again later';
        return;
      }
      callbackParams.state = this.route.snapshot.queryParamMap.get( 'state' );
    }

    if ( this.oauth.callbackParams.includes( 'oauth_token' ) ) {
      if ( !this.route.snapshot.queryParamMap.has( 'oauth_token' ) ) {
        this.error = 'Please try again later';
        return;
      }
      callbackParams.oauth_token =
          this.route.snapshot.queryParamMap.get( 'oauth_token' );
    }

    if ( this.oauth.callbackParams.includes( 'oauth_verifier' ) ) {
      if ( !this.route.snapshot.queryParamMap.has( 'oauth_verifier' ) ) {
        this.error = 'Please try again later';
        return;
      }
      callbackParams.oauth_verifier =
          this.route.snapshot.queryParamMap.get( 'oauth_verifier' );
    }

    this.authenticationService
    .socialLogin( this.oauth.tag, callbackParams )
    .pipe( first() )
    .subscribe(
        ( response ) => {
          if ( response.preAuthToken ) {
            this.authenticationService.setPreAuthToken( response );
            this.router.navigate( [ URLS.twoFactorVerification ], {
              queryParams: {
                oauthName: this.oauth.name,
                oauthLogo: this.oauth.logo
              }
            } );
          } else {
            this.businessLogicService.me()
            .subscribe( () => {
              this.analyticsService.logLoginEvent( this.oauth ).subscribe();
            } );
            this.router.navigate( [ URLS.dashboard.root ] );
          }
        },
        ( errorResponse ) => {
          if ( typeof errorResponse.error === 'string' ) {
            this.error = errorResponse.error;
          } else if ( errorResponse.statusText ) {
            this.error = errorResponse.statusText;
          }
        }
    );
  }
}
