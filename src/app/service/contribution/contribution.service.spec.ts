import { TestBed } from '@angular/core/testing';

import { ContributionService } from './contribution.service';

describe( 'ContributionService', () => {
  let service: ContributionService;

  beforeEach( () => {
    TestBed.configureTestingModule( {} );
    service = TestBed.inject( ContributionService );
  } );

  it( 'should be created', () => {
    expect( service ).toBeTruthy();
  } );
} );
