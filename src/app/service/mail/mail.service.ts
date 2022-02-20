import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable( {
  providedIn: 'root',
} )
export class MailService {
  constructor( private http: HttpClient, @Inject(LOCALE_ID) public locale: string ) {
    // intentionally blank
  }

  sendContactUsMail( params: any ) {
    const preferredLanguage = this.getBrowserLocale()

    return this.http.post<any>( 
      `${ environment.serverUrl }/mail/contact`, 
      { params, preferredLanguage } 
    );
  }

  getBrowserLocale() {
    const browserLocale = this.locale

    if( !browserLocale ) {
      return undefined;
    }

    const trimmedLocale = browserLocale.trim();

    return trimmedLocale.split(/-|_/)[0];
  }
}
