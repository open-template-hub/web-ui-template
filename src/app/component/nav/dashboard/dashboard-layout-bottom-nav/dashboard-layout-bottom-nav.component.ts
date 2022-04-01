import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { URLS } from '../../../../data/navigation/navigation.data';
import { PremiumProducts } from '../../../../data/premium-products/premium-product.data';
import { PROFILE_IMG } from '../../../../data/profile/profile.data';
import { AuthToken } from '../../../../model/auth/auth-token.model';
import { AuthenticationService } from '../../../../service/auth/authentication.service';
import { BusinessLogicService } from '../../../../service/business-logic/business-logic.service';
import { FileStorageService } from '../../../../service/file-storage/file-storage.service';
import { LoadingService } from '../../../../service/loading/loading.service';
import { PaymentService } from '../../../../service/payment/payment.service';
import { ProductService } from '../../../../service/product/product.service';
import { SocketService } from '../../../../service/socket/socket.service';

@Component( {
  selector: 'app-dashboard-layout-bottom-nav',
  templateUrl: './dashboard-layout-bottom-nav.component.html',
  styleUrls: [ './dashboard-layout-bottom-nav.component.scss' ]
} )
export class DashboardLayoutBottomNavComponent {

  currentUser: AuthToken;
  userInfo: any = {};
  loading = false;
  settingsOpened = false;
  moreOpened = false;
  profileImg = PROFILE_IMG;
  userIsPremium;

  notifications: any[] = [];

  URLS = URLS;

  @ViewChild( 'dropdownMenuProducts' ) dropdownMenuProducts: ElementRef;
  @ViewChild( 'dropdownMenuServices' ) dropdownMenuServices: ElementRef;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private loadingService: LoadingService,
      private businessLogicService: BusinessLogicService,
      private paymentService: PaymentService,
      private fileStorageService: FileStorageService,
      private productService: ProductService,
      private socketService: SocketService
  ) {
    this.authenticationService.currentUser.subscribe( currentUser => {
      this.currentUser = currentUser;
    } );

    this.loadingService.sharedLoading.subscribe( loading => this.loading = loading );

    this.businessLogicService.userInfo.subscribe( userInfo => {
      if ( userInfo ) {
        this.userInfo = userInfo;
      }

      if ( this.userInfo.profileImg ) {
        this.profileImg = userInfo.profileImg;
      }
    } );

    this.fileStorageService.sharedProfileImage.subscribe( profileImg => {
      if ( profileImg?.file?.data ) {
        this.profileImg = 'data:image/png;base64,' + profileImg.file.data;
      }
    } );

    this.productService.premiumProducts.subscribe( product => {
      this.userIsPremium = product?.name !== undefined;
    } );

    this.socketService.socketActivityList.subscribe( socketActivityList => {
      this.notifications = socketActivityList;
    } );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate( [ '/' ] ).then( () => {
      return true;
    } );
  }

  buy() {
    this.paymentService.initPayment( environment.payment.stripe, PremiumProducts.premiumAccount, 1 );
  }
}
