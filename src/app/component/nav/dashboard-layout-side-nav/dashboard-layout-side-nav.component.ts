import { Component, OnInit } from '@angular/core';
import { AuthToken } from '../../../model/AuthToken';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { ThemeService } from '../../../service/theme/theme.service';

@Component({
  selector: 'app-dashboard-layout-side-nav',
  templateUrl: './dashboard-layout-side-nav.component.html',
  styleUrls: ['./dashboard-layout-side-nav.component.scss']
})
export class DashboardLayoutSideNavComponent implements OnInit {

  darkTheme: string;
  sideNavClosed = 'false';
  brandLogo: string;

  currentUser: AuthToken;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private themeService: ThemeService
  ) {
    this.authenticationService.currentUser.subscribe(currentUser => {
      this.currentUser = currentUser;
    });

    this.themeService.darkTheme.subscribe(darkTheme => {
      this.darkTheme = darkTheme;
    });

    this.themeService.sideNavClosed.subscribe(sideNavClosed => {
      this.sideNavClosed = sideNavClosed;
    });

    this.brandLogo = this.themeService.brandLogo;
  }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']).then(() => {
      return true;
    });
  }

  switchTheme() {
    this.themeService.switchDarkTheme();
  }

  toggleSideNav() {
    this.themeService.toggleSideNav();
  }
}
