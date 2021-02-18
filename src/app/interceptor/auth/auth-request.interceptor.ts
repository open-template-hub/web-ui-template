import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../service/auth/authentication.service';

@Injectable()
export class AuthRequestInterceptor implements HttpInterceptor {

  constructor( private authenticationService: AuthenticationService ) {
  }

  intercept( request: HttpRequest<unknown>, next: HttpHandler ): Observable<HttpEvent<unknown>> {
    request = this.authenticationService.addAuthorizationHeader( request );
    return next.handle( request );
  }
}
