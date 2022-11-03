import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Rate } from '../../../component/rate-bar/rate-bar.component';
import { URLS } from '../../../data/navigation/navigation.data';
import { PremiumProducts } from '../../../data/premium-products/premium-product.data';
import { PROFILE_IMG } from '../../../data/profile/profile.data';
import { AuthToken } from '../../../model/auth/auth-token.model';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { BusinessLogicService } from '../../../service/business-logic/business-logic.service';
import { FileStorageService } from '../../../service/file-storage/file-storage.service';
import { InformationService } from '../../../service/information/information.service';
import { LoadingService } from '../../../service/loading/loading.service';
import { PaymentService } from '../../../service/payment/payment.service';
import { ProductService } from '../../../service/product/product.service';
import { ToastService } from '../../../service/toast/toast.service';

@Component( {
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: [ './dashboard-page.component.scss' ]
} )
export class DashboardPageComponent implements OnInit, OnDestroy {

  currentUser: AuthToken;
  userInfo: any = {};
  environment = environment;
  profileImg = PROFILE_IMG;
  loading = false;
  userIsPremium;
  URLS = URLS;

  form: FormGroup;

  rateObject: Rate;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private loadingService: LoadingService,
      private businessLogicService: BusinessLogicService,
      private fileStorageService: FileStorageService,
      private informationService: InformationService,
      private toastService: ToastService,
      private paymentService: PaymentService,
      private productService: ProductService
  ) {
    this.authenticationService.currentUser.subscribe( currentUser => {
      this.currentUser = currentUser;
    } );

    this.businessLogicService.userInfo.subscribe( userInfo => {
      this.userInfo = userInfo;
    } );


    this.loadingService.sharedLoading.subscribe( loading => this.loading = loading );

    this.businessLogicService.me()
    .subscribe( userInfo => {
      this.userInfo = userInfo;
      this.productService.checkProduct();
      if ( !this.userInfo.payload ) {
        this.businessLogicService.createMyInfo()
        .subscribe( () => {
          this.router.navigate( [ URLS.settings.editProfile ] );
        } );
      } else {

        if ( this.userInfo?.payload?.profileImageId ) {
          this.fileStorageService.downloadProfileImage( this.userInfo.payload.profileImageId ).subscribe();
        }
      }
    } );

    this.fileStorageService.sharedProfileImage.subscribe( profileImg => {
      if ( profileImg?.file?.data ) {
        this.profileImg = 'data:image/png;base64,' + profileImg.file.data;
      }
    } );

    this.productService.premiumProducts.subscribe( products => {
      this.userIsPremium = products?.length > 0;
    } );
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group( {
      message: [ '', Validators.required ]
    } );
  }

  ngOnDestroy() {
    this.informationService.clearInformation();
  }
}
