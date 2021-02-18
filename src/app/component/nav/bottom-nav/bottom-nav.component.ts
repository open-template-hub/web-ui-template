import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthToken } from '../../../model/AuthToken';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { LoadingService } from '../../../service/loading/loading.service';
import { ThemeService } from '../../../service/theme/theme.service';

@Component( {
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: [ './bottom-nav.component.scss' ]
} )
export class BottomNavComponent implements OnInit {

  currentUser: AuthToken;
  loading: boolean = false;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private themeService: ThemeService,
      private loadingService: LoadingService
  ) {
    this.authenticationService.currentUser.subscribe( currentUser => {
      this.currentUser = currentUser;
    } );

    this.loadingService.sharedLoading.subscribe( loading => this.loading = loading );
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
