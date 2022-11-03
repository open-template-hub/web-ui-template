import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BRAND } from '../../../../data/brand/brand.data';
import { URLS } from '../../../../data/navigation/navigation.data';
import { PROFILE_IMG } from '../../../../data/profile/profile.data';
import { BusinessLogicService } from '../../../../service/business-logic/business-logic.service';
import { FileStorageService } from '../../../../service/file-storage/file-storage.service';
import { LoadingService } from '../../../../service/loading/loading.service';
import { ProductService } from '../../../../service/product/product.service';

@Component( {
  selector: 'app-dashboard-layout-top-nav',
  templateUrl: './dashboard-layout-top-nav.component.html',
  styleUrls: [ './dashboard-layout-top-nav.component.scss' ]
} )
export class DashboardLayoutTopNavComponent {

  userInfo: any = {};
  loading = false;
  profileImg = PROFILE_IMG;
  userIsPremium;

  searchResults = [];

  searchEnabled = true;

  URLS = URLS;
  BRAND = BRAND;

  @ViewChild( 'searchArea' ) searchArea: ElementRef;

  constructor(
      private businessLogicService: BusinessLogicService,
      private fileStorageService: FileStorageService,
      private loadingService: LoadingService,
      private _eref: ElementRef,
      private productService: ProductService
  ) {
    this.businessLogicService.userInfo.subscribe( userInfo => {
          if ( userInfo ) {
            this.userInfo = userInfo;
          }

          if ( this.userInfo.profileImg ) {
            this.profileImg = userInfo.profileImg;
          }
        }
    );

    this.fileStorageService.sharedProfileImage.subscribe( profileImg => {
          if ( profileImg?.file?.data ) {
            this.profileImg = 'data:image/png;base64,' + profileImg.file.data;
          }
        }
    );

    this.loadingService.sharedLoading.subscribe( loading => this.loading = loading );

    this.productService.premiumProducts.subscribe( products => {
      this.userIsPremium = products?.length > 0;
    } );
    
  }

  @HostListener( 'document:click', [ '$event' ] )
  onDocumentClick( event ) {
    this.searchEnabled = !!this.searchArea.nativeElement.contains( event.target );
  }

  search( event: any ) {
    const q = event.target.value;

    if ( !q || q.length < 3 ) {
      this.searchResults = [];
    }
  }
}
