import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsEventCardComponent } from './analytics-event-card.component';

describe( 'AnalyticsEventCardComponent', () => {
  let component: AnalyticsEventCardComponent;
  let fixture: ComponentFixture<AnalyticsEventCardComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule( {
      declarations: [ AnalyticsEventCardComponent ]
    } )
    .compileComponents();
  } );

  beforeEach( () => {
    fixture = TestBed.createComponent( AnalyticsEventCardComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
