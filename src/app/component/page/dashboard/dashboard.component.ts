import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthToken } from '../../../model/AuthToken';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { BasicInfoService } from '../../../service/basic-info/basic-info.service';
import { ErrorService } from '../../../service/error/error.service';
import { FileStorageService } from '../../../service/file-storage/file-storage.service';
import { LoadingService } from '../../../service/loading/loading.service';
import { PaymentService } from '../../../service/payment/payment.service';
import { ProductService } from '../../../service/product/product.service';

@Component( {
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
} )
export class DashboardComponent implements OnInit {

  currentUser: AuthToken;
  userInfo: any = {};
  error = '';
  environment = environment;
  profileImg = './assets/profile-img.png';

  premium = undefined;
  responseProcessed = false;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private loadingService: LoadingService,
      private basicInfoService: BasicInfoService,
      private fileStorageService: FileStorageService,
      private paymentService: PaymentService,
      private errorService: ErrorService,
      private productService: ProductService
  ) {
    this.authenticationService.currentUser.subscribe( currentUser => this.currentUser = currentUser );
    this.basicInfoService.userInfo.subscribe( userInfo => this.userInfo = userInfo );
    this.errorService.sharedError.subscribe( error => this.error = error );

    this.fileStorageService.profileImage.subscribe( profileImg => {
          if ( profileImg?.file?.data ) {
            this.profileImg = 'data:image/png;base64,' + profileImg.file.data;
          }
        }
    );

  }

  ngOnInit(): void {
    this.loadingService.setLoading( true );
    this.basicInfoService.me()
    .subscribe( userInfo => {
          this.userInfo = userInfo;

          if ( !this.userInfo.payload ) {
/*
            this.basicInfoService.createMyInfo()
            .subscribe( () => {
                  this.loadingService.setLoading( false );
                  this.router.navigate( [ '/dashboard/welcome' ] );
                },
                error => {
                  this.loadingService.setLoading( false );
                  this.errorService.setError( error.message );
                }
            );
*/
          } else {
            if ( this.userInfo.payload.profileImageId ) {
              this.fileStorageService.downloadProfileImage( this.userInfo.payload.profileImageId )
              .subscribe( () => {
                    this.loadingService.setLoading( false );
                  },
                  error => {
                    this.loadingService.setLoading( false );
                    this.errorService.setError( error.message );
                  }
              );
            } else {
              this.loadingService.setLoading( false );
            }
          }
        },
        error => {
          this.loadingService.setLoading( false );
          this.errorService.setError( error.message );
        }
    );
    this.getPremium();
  }

  buyPremium( paymentMethod ) {
    this.loadingService.setLoading( true );
    this.paymentService.initPayment( paymentMethod, '0276d8d1-0945-412b-92d1-084a6e3f7554', 1 );
  }

  getPremium() {
    this.loadingService.setLoading( true );
    this.productService.getProduct( '0276d8d1-0945-412b-92d1-084a6e3f7554' ).subscribe( response => {
      this.loadingService.setLoading( false );
      if ( response.payload ) {
        this.premium = response;
      }
      this.responseProcessed = true;
    } );
  }
}
