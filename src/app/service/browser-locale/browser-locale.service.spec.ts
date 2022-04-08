import { TestBed } from '@angular/core/testing';

import { BrowserLocaleService } from './browser-locale.service';

describe( 'BrowserLocaleService', () => {
  let service: BrowserLocaleService;

  beforeEach( () => {
    TestBed.configureTestingModule( {} );
    service = TestBed.inject( BrowserLocaleService );
  } );

  it( 'should be created', () => {
    expect( service ).toBeTruthy();
  } );
} );
