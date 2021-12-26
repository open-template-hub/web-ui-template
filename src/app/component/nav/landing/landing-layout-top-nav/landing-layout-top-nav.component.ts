import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { BRAND } from '../../../../data/brand/brand.data';
import { URLS } from '../../../../data/navigation/navigation.data';
import { PremiumProducts } from '../../../../data/premium-products/premium-product.data';
import { PROFILE_IMG } from '../../../../data/profile/profile.data';
import { AuthToken } from '../../../../model/auth/auth-token.model';
import { AuthenticationService } from '../../../../service/auth/authentication.service';
import { FileStorageService } from '../../../../service/file-storage/file-storage.service';
import { LoadingService } from '../../../../service/loading/loading.service';
import { PaymentService } from '../../../../service/payment/payment.service';
import { ProductService } from '../../../../service/product/product.service';

@Component( {
  selector: 'app-landing-layout-top-nav',
  templateUrl: './landing-layout-top-nav.component.html',
  styleUrls: [ './landing-layout-top-nav.component.scss' ]
} )
export class LandingLayoutTopNavComponent {

  profileImg = PROFILE_IMG;
  userIsPremium;
  currentUser: AuthToken;
  loading = false;

  URLS = URLS;
  BRAND = BRAND;

  @ViewChild( 'dropdownMenuParent' ) dropdownMenuParent: ElementRef;

  settings = [
    { name: 'Edit Profile', icon: 'person', url: URLS.settings.editProfile },
    { name: 'Logout', icon: 'exit_to_app', logout: true }
  ]

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private authenticationService: AuthenticationService,
    private fileStorageService: FileStorageService,
    private paymentService: PaymentService,
    private productService: ProductService
  ) {
    this.loadingService.sharedLoading.subscribe( loading => this.loading = loading );

    this.authenticationService.currentUser.subscribe( currentUser => {
      this.currentUser = currentUser;
    } );

    this.fileStorageService.sharedProfileImage.subscribe( profileImg => {
        if ( profileImg?.file?.data ) {
          this.profileImg = 'data:image/png;base64,' + profileImg.file.data;
        }
      } );

    this.productService.premiumProducts.subscribe( product => {
      this.userIsPremium = product?.name !== undefined
    } );
  }

  buy() {
    this.paymentService.initPayment( environment.payment.stripe, PremiumProducts.premiumAccount, 1 );
  }
}
