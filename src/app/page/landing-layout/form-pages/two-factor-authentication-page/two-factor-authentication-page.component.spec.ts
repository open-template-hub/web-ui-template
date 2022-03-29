import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorAuthenticationPageComponent } from './two-factor-authentication-page.component';

describe( 'TwoFactorAuthenticationPageComponent', () => {
  let component: TwoFactorAuthenticationPageComponent;
  let fixture: ComponentFixture<TwoFactorAuthenticationPageComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule( {
      declarations: [ TwoFactorAuthenticationPageComponent ]
    } )
    .compileComponents();
  } );

  beforeEach( () => {
    fixture = TestBed.createComponent( TwoFactorAuthenticationPageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
