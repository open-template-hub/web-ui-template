import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from '../../service/auth/authentication.service';
import { AuthToken } from '../../model/AuthToken';

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor {

  private refreshingToken = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
          if (errorResponse.error instanceof ErrorEvent) {
            // client-side error or network error
            console.error('network error');
          } else {
            if (errorResponse.error?.message === 'jwt expired') {
              if (!this.refreshingToken) {
                console.log('token refreshing attempt');
                this.refreshingToken = true;
                this.refreshTokenSubject.next(null);

                return this.authenticationService.refreshToken(this.authenticationService.currentUserValue.refreshToken).pipe(
                  switchMap((currentUser: AuthToken) => {
                    this.refreshingToken = false;
                    this.refreshTokenSubject.next(currentUser);
                    request = this.authenticationService.addAuthorizationHeader(request);
                    console.log('token refreshed');
                    return next.handle(request);
                  }));
              } else {
                return this.refreshTokenSubject.pipe(
                  filter(currentUser => currentUser != null),
                  take(1),
                  switchMap(jwt => {
                    request = this.authenticationService.addAuthorizationHeader(request);
                    return next.handle(request);
                  }));
              }
            }

            if (errorResponse.status === 498) {
              this.authenticationService.logout();
              location.reload();
            }
            if (errorResponse.status === 401) {
              this.authenticationService.logout();
              location.reload();
            }
          }
          return throwError(errorResponse);
        }
      )
    );
  }
}
