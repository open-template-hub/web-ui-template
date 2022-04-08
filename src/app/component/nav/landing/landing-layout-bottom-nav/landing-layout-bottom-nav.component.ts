import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environmentCommon } from '../../../../../environments/environment-common';
import { URLS } from '../../../../data/navigation/navigation.data';
import { AuthToken } from '../../../../model/auth/auth-token.model';
import { AuthenticationService } from '../../../../service/auth/authentication.service';
import { BusinessLogicService } from '../../../../service/business-logic/business-logic.service';
import { LoadingService } from '../../../../service/loading/loading.service';

@Component( {
  selector: 'app-landing-layout-bottom-nav',
  templateUrl: './landing-layout-bottom-nav.component.html',
  styleUrls: [ './landing-layout-bottom-nav.component.scss' ]
} )
export class LandingLayoutBottomNavComponent {

  currentUser: AuthToken;
  userInfo: any = {};
  loading = false;

  environmentCommon = environmentCommon;

  URLS = URLS;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private loadingService: LoadingService,
      private businessLogicService: BusinessLogicService,
  ) {
    this.authenticationService.currentUser.subscribe( currentUser => {
      this.currentUser = currentUser;
    } );

    this.loadingService.sharedLoading.subscribe( loading => this.loading = loading );

    this.businessLogicService.userInfo.subscribe( userInfo => {
          if ( userInfo ) {
            this.userInfo = userInfo;
          }
        }
    );
  }
}
