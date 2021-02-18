import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthToken } from '../../../model/AuthToken';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { BasicInfoService } from '../../../service/basic-info/basic-info.service';
import { FileStorageService } from '../../../service/file-storage/file-storage.service';
import { ThemeService } from '../../../service/theme/theme.service';

@Component( {
  selector: 'app-dashboard-layout-side-nav',
  templateUrl: './dashboard-layout-side-nav.component.html',
  styleUrls: [ './dashboard-layout-side-nav.component.scss' ]
} )
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
      private fileStorageService: FileStorageService,
      private themeService: ThemeService
  ) {
    this.authenticationService.currentUser.subscribe( currentUser => {
      this.currentUser = currentUser;
    } );

    this.themeService.darkTheme.subscribe( darkTheme => {
      this.darkTheme = darkTheme;
    } );

    this.themeService.sideNavClosed.subscribe( sideNavClosed => {
      this.sideNavClosed = sideNavClosed;
    } );

    this.brand = this.themeService.brand;

    this.basicInfoService.userInfo.subscribe( userInfo => {
          if ( userInfo ) {
            this.userInfo = userInfo;
          }

          if ( this.userInfo.profileImg ) {
            this.profileImg = userInfo.profileImg;
          }
        }
    );

    this.fileStorageService.profileImage.subscribe( profileImg => {
          if ( profileImg?.file?.data ) {
            this.profileImg = 'data:image/png;base64,' + profileImg.file.data;
          }
        }
    );
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

  toggleSideNav() {
    this.themeService.toggleSideNav();
  }
}
