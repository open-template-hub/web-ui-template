import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BrowserLocaleService } from '../browser-locale/browser-locale.service';
import mixpanel from 'mixpanel-browser';

@Injectable( {
  providedIn: 'root',
} )
export class AnalyticsService {

  mixpanelEnabled = false;

  configs = {
    sideContentLimit: 12,
    editSecurityLimit: 12
  };

  constructor(
      private http: HttpClient,
      private browserLocaleService: BrowserLocaleService
  ) {
    if ( environment.analytics.mixPanel.tag ) {
      mixpanel.init( environment.analytics.mixPanel.tag );
      this.mixpanelEnabled = true;
    }
  }

  logLoginEvent( oauth?: any ) {
    if ( oauth ) {
      return this.logSocialLoginEvent( oauth.name, oauth.logo );
    } else {
      const data = {
        payload: {
          icon: './assets/common/profile-img.png'
        },
        category: 'LOGIN',
        source: environment.clientUrl
      };

      this.logEvent( 'Login', data );

      return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data );
    }
  }

  logLogoutEvent() {
    const data = {
      payload: {
        icon: './assets/common/profile-img.png'
      },
      category: 'LOGOUT',
      source: environment.clientUrl
    };

    this.logEvent( 'Logout', data );

    return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data );
  }

  logPaymentEvent( payment: any ) {
    const data = {
      payload: {
        provider: payment.name,
        icon: payment.logo
      },
      category: 'PAYMENT',
      source: environment.clientUrl
    };

    this.logEvent( 'Payment', data );

    return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data );
  }

  logSubmitPhoneNumberEvent() {
    const data = {
      category: 'TWO_FACTOR_AUTH',
      source: environment.clientUrl
    };

    this.logEvent( 'Submit Phone Number', data );

    return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data );
  }

  getEvents( category: string | undefined, start: number | undefined, end: number | undefined, skip: number, limit: number ) {
    let queryParams = `skip=${ skip }&limit=${ limit }`;

    if ( category ) {
      queryParams += `&category=${ category }`;
    }

    if ( start ) {
      queryParams += `&start=${ start }`;
    }

    if ( end ) {
      queryParams += `&end=${ end }`;
    }

    return this.http.get<any>( `${ environment.serverUrl }/analytics/event?${ queryParams }` );
  }

  getCategories() {
    const language = this.browserLocaleService.getBrowserLocale();
    return this.http.get<any>( `${ environment.serverUrl }/analytics/event/categories?language=${ language }` );
  }

  convertCategoriesToMappedObject( categoriesResponse: any ): any {
    const categories: any = {};
    for ( const category of categoriesResponse ) {
      if ( category.messages.length > 0 ) {
        categories[ category.key ] = category.messages[ 0 ].text;
      }
    }
    return categories;
  }

  identifyUser( userInfo: any ) {
    if ( this.mixpanelEnabled && userInfo?.username ) {
      mixpanel.identify( userInfo?.username );
      mixpanel.people.set( {
        $first_name: userInfo?.payload?.firstName,
        $last_name: userInfo?.payload?.lastName,
        $created: Date.now(),
        $email: userInfo?.email
      } );
    }
  }

  logEvent( event: string, attributes: any ) {
    if ( this.mixpanelEnabled ) {
      mixpanel.track( event, attributes );
    } else {
      console.log( 'Event: ', event, attributes );
    }
  }

  logout() {
    this.logLogoutEvent();
    if ( this.mixpanelEnabled ) {
      mixpanel.reset();
    }
  }

  private logSocialLoginEvent( provider: string, icon: string ) {

    const data: any = {
      category: 'SOCIAL_LOGIN',
      source: environment.clientUrl
    };

    data.payload = {};

    if ( provider ) {
      data.payload.provider = provider;
    }

    if ( icon ) {
      data.payload.icon = icon;
    }

    this.logEvent( 'Social Login', data );

    return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data );
  }
}
