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

  logLoginEvent() {
    const data = {
      payload: {
        message: 'Login Activity',
        icon: './assets/common/profile-img.png'
      },
      category: 'LOGIN',
      source: environment.clientUrl
    }

    return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data);
  }

  logSocialLoginEvent( oauth: any ) {
    const data = {
      payload: {
        message: 'Social Login Activity',
        provider: oauth.name,
        icon: oauth.logo
      },
      category: 'SOCIAL_LOGIN',
      source: environment.clientUrl
    }

    return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data);
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
    }

    return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data);
  }

  logSubmitPhoneNumberEvent() {
    const data = {
      payload: {
        message: 'Submit Phone Number Activity'
      },
      category: 'TWO_FACTOR_AUTH',
      source: environment.clientUrl
    }

    return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data);
  }

  getEvents( category: string, start: number | undefined, skip: number, limit: number ) {
    return this.http.get<any>( `${ environment.serverUrl }/analytics/event?category=${ category }&start=${ start }&skip=${ skip }&limit=${ limit }`)
  }

  getConfig() {
    return this.http.get<any>( `${ environment.serverUrl }/analytics/event/config`)
  }
}
