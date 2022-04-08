import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BrowserLocaleService } from '../browser-locale/browser-locale.service';

@Injectable( {
  providedIn: 'root',
} )
export class MailService {
  constructor(
      private http: HttpClient,
      private browserLocale: BrowserLocaleService
  ) {
    // intentionally blank
  }

  sendContactUsMail( params: any ) {
    const preferredLanguage = this.browserLocale.getBrowserLocale();

    return this.http.post<any>(
        `${ environment.serverUrl }/mail/contact`,
        { params, preferredLanguage }
    );
  }
}
