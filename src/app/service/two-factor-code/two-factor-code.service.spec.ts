import { TestBed } from '@angular/core/testing';

import { TwoFactorCodeService } from './two-factor-code.service';

describe( 'TwoFactorCodeService', () => {
  let service: TwoFactorCodeService;

  beforeEach( () => {
    TestBed.configureTestingModule( {} );
    service = TestBed.inject( TwoFactorCodeService );
  } );

  it( 'should be created', () => {
    expect( service ).toBeTruthy();
  } );
} );
