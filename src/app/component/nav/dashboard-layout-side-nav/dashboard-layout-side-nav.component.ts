import { Component, OnInit } from '@angular/core';
import { AuthToken } from '../../../model/AuthToken';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { ThemeService } from '../../../service/theme/theme.service';
import { BasicInfoService } from '../../../service/basic-info/basic-info.service';

@Component({
  selector: 'app-dashboard-layout-side-nav',
  templateUrl: './dashboard-layout-side-nav.component.html',
  styleUrls: ['./dashboard-layout-side-nav.component.scss']
})
export class DashboardLayoutSideNavComponent implements OnInit {

  darkTheme: string;
  sideNavClosed = 'false';
  userInfo: any = {};
  profileImg = './assets/profile-img.png';

  brand = {
    brandLogo: '',
  };

  currentUser: AuthToken;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private basicInfoService: BasicInfoService,
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

    this.brand = this.themeService.brand;

    this.basicInfoService.userInfo.subscribe(userInfo => {
        if (userInfo) {
          this.userInfo = userInfo;
        }

        if (this.userInfo.profileImg) {
          this.profileImg = userInfo.profileImg;
        }
      }
    );
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
