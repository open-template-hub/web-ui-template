import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingLayoutBottomNavComponent } from './landing-layout-bottom-nav.component';

describe( 'LandingLayoutBottomNavComponent', () => {
  let component: LandingLayoutBottomNavComponent;
  let fixture: ComponentFixture<LandingLayoutBottomNavComponent>;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      declarations: [ LandingLayoutBottomNavComponent ]
    } )
    .compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( LandingLayoutBottomNavComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
