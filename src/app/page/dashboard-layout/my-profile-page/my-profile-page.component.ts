import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Rate } from '../../../component/rate-bar/rate-bar.component';
import { URLS } from '../../../data/navigation/navigation.data';
import { PROFILE_IMG } from '../../../data/profile/profile.data';
import { AuthToken } from '../../../model/auth/auth-token.model';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { BusinessLogicService } from '../../../service/business-logic/business-logic.service';
import { FileStorageService } from '../../../service/file-storage/file-storage.service';
import { InformationService } from '../../../service/information/information.service';
import { LoadingService } from '../../../service/loading/loading.service';
import { ProductService } from '../../../service/product/product.service';

@Component( {
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: [ './my-profile-page.component.scss' ]
} )
export class MyProfilePageComponent implements OnDestroy {

  currentUser: AuthToken;
  userInfo: any = {};
  environment = environment;
  profileImg = PROFILE_IMG;
  loading = false;
  userIsPremium;

  URLS = URLS;

  rateObject: Rate;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService,
    private businessLogicService: BusinessLogicService,
    private fileStorageService: FileStorageService,
    private informationService: InformationService,
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

        if ( !this.userInfo.payload ) {
          this.businessLogicService.createMyInfo()
          .subscribe( () => {
              this.router.navigate( [ URLS.settings.editProfile ] );
            }
          );
        } else {
          if ( this.userInfo?.payload?.profileImageId ) {
            this.fileStorageService.downloadProfileImage( this.userInfo.payload.profileImageId ).subscribe();
          }
        }
      }
    );

    this.fileStorageService.sharedProfileImage.subscribe( profileImg => {
      if ( profileImg?.file?.data ) {
        this.profileImg = 'data:image/png;base64,' + profileImg.file.data;
      }
    } );

    this.productService.premiumProducts.subscribe( response => {
      this.userIsPremium = response?.name !== undefined;
    } );
  }

  ngOnDestroy() {
    this.informationService.clearInformation();
  }
}
