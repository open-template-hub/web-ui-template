import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumPageComponent } from './premium-page.component';

describe( 'PremiumPageComponent', () => {
  let component: PremiumPageComponent;
  let fixture: ComponentFixture<PremiumPageComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule( {
      declarations: [ PremiumPageComponent ]
    } )
    .compileComponents();
  } );

  beforeEach( () => {
    fixture = TestBed.createComponent( PremiumPageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
