import { Component } from '@angular/core';
import { LoadingService } from '../../service/loading/loading.service';
import { HomePageComponent } from './home-page/home-page.component';

@Component( {
  selector: 'app-landing-layout',
  templateUrl: './landing-layout.component.html',
  styleUrls: [ './landing-layout.component.scss' ]
} )
export class LandingLayoutComponent {

  loading = false;

  constructor( private loadingService: LoadingService ) {
    this.loadingService.sharedLoading.subscribe( loading => this.loading = loading );
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
