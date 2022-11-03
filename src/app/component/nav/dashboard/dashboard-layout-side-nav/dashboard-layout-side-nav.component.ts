import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BRAND } from '../../../../data/brand/brand.data';
import { URLS } from '../../../../data/navigation/navigation.data';
import { PROFILE_IMG } from '../../../../data/profile/profile.data';
import { AuthToken } from '../../../../model/auth/auth-token.model';
import { AuthenticationService } from '../../../../service/auth/authentication.service';
import { BusinessLogicService } from '../../../../service/business-logic/business-logic.service';
import { FileStorageService } from '../../../../service/file-storage/file-storage.service';
import { NotificationService } from '../../../../service/notification/notification.service';
import { ProductService } from '../../../../service/product/product.service';
import { ThemeService } from '../../../../service/theme/theme.service';

@Component( {
  selector: 'app-dashboard-layout-side-nav',
  templateUrl: './dashboard-layout-side-nav.component.html',
  styleUrls: [ './dashboard-layout-side-nav.component.scss' ]
} )
export class DashboardLayoutSideNavComponent {
  userIsPremium;
  sideNavClosed = 'false';
  userInfo: any = {};
  profileImg = PROFILE_IMG;

  URLS = URLS;
  BRAND = BRAND;

  currentUser: AuthToken;
  settingsOpened = false;
  settingsMoreOpened = false;

  @ViewChild( 'searchArea' )
  searchArea: ElementRef;

  notifications: any[] = [];

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private businessLogicService: BusinessLogicService,
      private fileStorageService: FileStorageService,
      private themeService: ThemeService,
      private productService: ProductService,
      private notificationService: NotificationService
  ) {
    this.authenticationService.currentUser.subscribe( currentUser => {
      this.currentUser = currentUser;
    } );

    this.themeService.sideNavClosed.subscribe( sideNavClosed => {
      this.sideNavClosed = sideNavClosed;
    } );

    this.businessLogicService.userInfo.subscribe( userInfo => {
          if ( userInfo ) {
            this.userInfo = userInfo;
          }

          if ( this.userInfo.profileImg ) {
            this.profileImg = userInfo.profileImg;
          }
        }
    );

    this.fileStorageService.sharedProfileImage?.subscribe( profileImg => {
          if ( profileImg?.file?.data ) {
            this.profileImg = 'data:image/png;base64,' + profileImg.file.data;
          }
        }
    );

    this.productService.premiumProducts.subscribe( products => {
      this.userIsPremium = products?.length > 0;
    } );

    this.notificationService.notifications.subscribe( notifications => {
      this.notifications = notifications.filter( notification => !notification.read );
    } );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate( [ '/' ] ).then( () => {
      return true;
    } );
  }

  toggleSideNav() {
    this.themeService.toggleSideNav();
  }
}
