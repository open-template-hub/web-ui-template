import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BrowserLocaleService } from '../browser-locale/browser-locale.service';

@Injectable( {
  providedIn: 'root',
} )
export class AnalyticsService {
  configs = {
    sideContentLimit: 12,
    editSecurityLimit: 12
  };

  constructor(
      private http: HttpClient,
      private browserLocaleService: BrowserLocaleService
  ) {
    // intentionally blank
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

      return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data );
    }
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

    return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data );
  }

  logSubmitPhoneNumberEvent() {
    const data = {
      category: 'TWO_FACTOR_AUTH',
      source: environment.clientUrl
    };

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

  private logSocialLoginEvent( provider: string, icon: string ) {

    const data: any = {
      category: 'SOCIAL_LOGIN',
      source: environment.clientUrl
    };

    if ( provider ) {
      data.payload = { provider };
    }

    if ( icon ) {
      data.payload = { icon };
    }

    return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data );
  }
}
