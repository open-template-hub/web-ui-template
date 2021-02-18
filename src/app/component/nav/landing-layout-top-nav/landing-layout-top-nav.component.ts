import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthToken } from '../../../model/AuthToken';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { ThemeService } from '../../../service/theme/theme.service';

@Component( {
  selector: 'app-landing-layout-top-nav',
  templateUrl: './landing-layout-top-nav.component.html',
  styleUrls: [ './landing-layout-top-nav.component.scss' ]
} )
export class LandingLayoutTopNavComponent implements OnInit {

  currentUser: AuthToken;

  brand = {
    brandLogo: '',
  };

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private themeService: ThemeService
  ) {
    this.authenticationService.currentUser.subscribe( currentUser => {
      this.currentUser = currentUser;
    } );

    this.brand = this.themeService.brand;
  }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate( [ '/' ] ).then( () => {
      return true;
    } );
  }

  switchTheme() {
    this.themeService.switchDarkTheme();
  }
}
