import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BrowserLocaleService } from '../browser-locale/browser-locale.service';

@Injectable( {
  providedIn: 'root',
} )
export class TwoFactorCodeService {
  constructor(
      private http: HttpClient,
      private browserLocaleService: BrowserLocaleService
  ) {
  }

  submitPhoneNumber( phoneNumber: string ) {
    // TODO: Will we use language code?
    const languageCode = this.browserLocaleService.getBrowserLocale();
    return this.http.post<any>( `${ environment.serverUrl }/2fa/request`, {
      phoneNumber,
    } );
  }

  verify( code: string, isInitialVerification: boolean ) {
    return this.http.post<any>( `${ environment.serverUrl }/2fa/verify`, {
      code,
      isInitialVerification,
    } );
  }

  loginVerify( code: string, preAuthToken: string ) {
    return this.http.post<any>( `${ environment.serverUrl }/2fa/loginVerify`, {
      code,
      preAuthToken,
    } );
  }
}
