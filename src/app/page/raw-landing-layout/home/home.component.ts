import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CountUp } from 'countup.js';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { ThemeService } from '../../../service/theme/theme.service';
import { URLS } from '../../../util/constant';

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss', '../raw-landing-layout.component.scss' ]
} )
export class HomeComponent implements OnInit, AfterViewInit {

  // TODO: Will be initialized by apis
  eventCounter = 2700;
  studentCounter = 7;
  userCounter = 5;

  brand = {
    brandLogo: '',
  };

  URLS = URLS;

  KILO = 1000;
  MILLION = this.KILO * this.KILO;


  constructor(
      private formBuilder: FormBuilder,
      public router: Router,
      private authenticationService: AuthenticationService,
      private themeService: ThemeService
  ) {
    // redirect to home if already logged in
    if ( this.authenticationService.currentUserValue ) {
      this.router.navigate( [ URLS.dashboard.root ] );
    }

    this.brand = this.themeService.brand;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.initCountUps();
  }

  private initCountUps() {
    const options = {
      useGrouping: false,
      duration: undefined,
      formattingFn: undefined
    };

    options.formattingFn = ( n: number ) => {
      return this.countUpFormatter( n, this.eventCounter );
    };
    options.duration = this.eventCounter < this.KILO ? 2 : this.eventCounter < this.MILLION ? 3 : 4;

    const eventCountUp = new CountUp( 'npmCounterElement', this.eventCounter, options );

    options.formattingFn = ( n: number ) => {
      return this.countUpFormatter( n, this.studentCounter );
    };
    options.duration = this.studentCounter < this.KILO ? 2 : this.studentCounter < this.MILLION ? 3 : 4;
    const studentCountUp = new CountUp( 'githubStarCounterElement', this.studentCounter, options );

    options.formattingFn = ( n: number ) => {
      return this.countUpFormatter( n, this.userCounter );
    };
    options.duration = this.userCounter < this.KILO ? 2 : this.userCounter < this.MILLION ? 3 : 4;
    const userCountUp = new CountUp( 'serverTypesCounterElement', this.userCounter, options );

    if ( !eventCountUp.error ) {
      eventCountUp.start();
    } else {
      console.error( eventCountUp.error );
    }
    if ( !studentCountUp.error ) {
      studentCountUp.start();
    } else {
      console.error( studentCountUp.error );
    }
    if ( !userCountUp.error ) {
      userCountUp.start();
    } else {
      console.error( userCountUp.error );
    }
  }

  countUpFormatter( n: number, lastNumber: number ) {
    return n < this.KILO ? n + '' :
        ( n < this.MILLION ? Math.round( n / this.KILO * 10 ) / 10 + 'k' :
            Math.round( n / this.MILLION * 10 ) / 10 + 'M' );
  }
}
