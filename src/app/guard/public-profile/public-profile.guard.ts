import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { URLS } from '../../data/navigation/navigation.data';
import { AuthenticationService } from '../../service/auth/authentication.service';

@Injectable( {
  providedIn: 'root'
} )
export class PublicProfileGuard implements CanActivate {

  URLS = URLS;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
  }

  canActivate(
      next: ActivatedRouteSnapshot,
      _state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUser = this.authenticationService.currentUserValue;
    if ( currentUser ) {
      // logged in so return true
      return true;
    }

    const username = next.paramMap.get( 'username' );

    // not logged in so redirect to login page with the return url
    this.router.navigate( [ URLS.u + '/' + username ] ).then( () => {
      return false;
    } );
  }
}
