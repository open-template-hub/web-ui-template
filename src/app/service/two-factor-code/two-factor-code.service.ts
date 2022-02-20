import { HttpClient, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BrowserLocaleService } from '../browser-locale/browser-locale.service';

@Injectable({
  providedIn: 'root'
})
export class TwoFactorCodeService {

  constructor(
    private http: HttpClient,
    private browserLocaleService: BrowserLocaleService
  ) { }

  submitPhoneNumber( phoneNumber: string ) {
    const languageCode = this.browserLocaleService.getBrowserLocale();
    return this.http.post<any>( `${ environment.serverUrl }/2fa/request`, { phoneNumber } );
  }
}
