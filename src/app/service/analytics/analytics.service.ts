import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable( {
  providedIn: 'root',
} )
export class AnalyticsService {
  constructor(
      private http: HttpClient,
  ) {
  }

  logLoginEvent( oauth?: any ) {
    if ( oauth ) {
      return this.logSocialLoginEvent( oauth.name, oauth.logo );
    } else {
      const data = {
        payload: {
          message: 'Login Activity',
          icon: './assets/common/profile-img.png'
        },
        category: 'LOGIN',
        source: environment.clientUrl
      };

      return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data );
    }
  }

  private logSocialLoginEvent( provider: string, icon: string ) {

    const data: any = {
      payload: {
        message: 'Social Login Activity'
      },
      category: 'SOCIAL_LOGIN',
      source: environment.clientUrl
    };

    if ( provider ) {
      data.payload.provider = provider;
    }

    if ( icon ) {
      data.payload.icon = icon;
    }

    console.log( 'logloginevent', data );

    return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data );
  }

  logPaymentEvent( payment: any ) {
    const data = {
      payload: {
        message: 'Payment Activity',
        provider: payment.name,
        icon: payment.logo
      },
      category: 'PAYMENT',
      source: environment.clientUrl
    };

    return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data );
  }

  logSubmitPhoneNumberEvent() {
    const data = {
      payload: {
        message: 'Submit Phone Number Activity'
      },
      category: 'TWO_FACTOR_AUTH',
      source: environment.clientUrl
    };

    return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data );
  }

  getEvents( category: string, start: number | undefined, skip: number, limit: number ) {
    return this.http.get<any>( `${ environment.serverUrl }/analytics/event?category=${ category }&start=${ start }&skip=${ skip }&limit=${ limit }`)
  }

  getConfig() {
    return this.http.get<any>( `${ environment.serverUrl }/analytics/event/config`)
  }
}
