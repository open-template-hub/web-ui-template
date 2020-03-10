import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../service/auth/authentication.service';

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // client-side error or network error
        } else {
          if (error.status === 498) {
            this.authenticationService.logout();
            location.reload();
          }
          if (error.status === 401) {
            this.authenticationService.logout();
            location.reload();
          }
        }
        return throwError(error);
      })
    );
  }
}
