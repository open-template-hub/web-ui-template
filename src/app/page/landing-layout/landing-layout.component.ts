import { Component } from '@angular/core';
import { AuthToken } from '../../model/auth/auth-token.model';
import { AuthenticationService } from '../../service/auth/authentication.service';
import { LoadingService } from '../../service/loading/loading.service';
import { HomePageComponent } from './home-page/home-page.component';

@Component( {
  selector: 'app-landing-layout',
  templateUrl: './landing-layout.component.html',
  styleUrls: [ './landing-layout.component.scss' ]
} )
export class LandingLayoutComponent {

  currentUser: AuthToken;
  loading = false;

  constructor(
    private loadingService: LoadingService,
    private authenticationService: AuthenticationService
  ) {
    this.loadingService.sharedLoading.subscribe( loading => this.loading = loading );

    this.authenticationService.currentUser.subscribe( currentUser => {
      this.currentUser = currentUser;
    } );
  }

  bottomSvgActiveComponents = [ HomePageComponent ]
  isBottomSvgActive = false;

  onRouterOutletActivate( event: any ) {
    for( const component of this.bottomSvgActiveComponents ) {
      if( event instanceof component ) {
        this.isBottomSvgActive = true;
        return;
      }
    }
    this.isBottomSvgActive = false;
  }
}
