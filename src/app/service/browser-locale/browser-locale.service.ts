import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable( {
  providedIn: 'root'
} )
export class BrowserLocaleService {

  constructor( @Inject( LOCALE_ID ) public locale: string ) {
  }

  getBrowserLocale(): string {
    const browserLocale = this.locale;

    if ( !browserLocale ) {
      return undefined;
    }

    const trimmedLocale = browserLocale.trim();

    return trimmedLocale.split( /-|_/ )[ 0 ];
  }
}
