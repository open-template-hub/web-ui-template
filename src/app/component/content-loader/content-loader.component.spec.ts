import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLoaderComponent } from './content-loader.component';

describe( 'ContentLoaderComponent', () => {
  let component: ContentLoaderComponent;
  let fixture: ComponentFixture<ContentLoaderComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule( {
      declarations: [ ContentLoaderComponent ]
    } )
    .compileComponents();
  } );

  beforeEach( () => {
    fixture = TestBed.createComponent( ContentLoaderComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
