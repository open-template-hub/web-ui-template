import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthToken } from '../../model/AuthToken';
import { map } from 'rxjs/operators';
import { ThemeService } from '../theme/theme.service';
import { BasicInfoService } from '../basic-info/basic-info.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<AuthToken>;
  public currentUser: Observable<AuthToken>;

  constructor(private http: HttpClient,
              private themeService: ThemeService,
              private basicInfoService: BasicInfoService
  ) {
    const currentUserStorageItem = localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : sessionStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<AuthToken>(JSON.parse(currentUserStorageItem));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthToken {
    return this.currentUserSubject.value;
  }

  signUp(username: string, email: string, password: string) {
    return this.http.post<any>(`${environment.serverUrl}/auth/signup`, {username, email, password});
  }

  login(username: string, password: string, rememberMe: boolean) {
    return this.http.post<any>(`${environment.serverUrl}/auth/login`, {username, password})
      .pipe(map(currentUser => {
        if (rememberMe) {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
          sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        this.currentUserSubject.next(currentUser);

        // TODO: get second parameter from basic info db
        this.themeService.initTheme(false);
        this.themeService.initSideNavClosed(false);

        return currentUser;
      }));
  }

  // https://stackoverflow.com/questions/48853678/what-happens-if-we-does-not-subscribe-to-httpclient-request-which-return-observa
  logout() {
    this.themeService.clearThemes();
    this.basicInfoService.logout();

    const refreshToken = this.currentUserValue.refreshToken;

    localStorage.clear();
    sessionStorage.clear();
    this.currentUserSubject.next(null);

    return this.http.post<any>(`${environment.serverUrl}/auth/logout`, {token: refreshToken}).subscribe();
  }

  verify(token: string) {
    return this.http.get<any>(`${environment.serverUrl}/auth/verify`, {params: {token}});
  }

  resetPassword(username: string, token: string, password: string) {
    return this.http.post<any>(`${environment.serverUrl}/auth/reset-password`, {username, token, password});
  }

  forgetPassword(username: any) {
    return this.http.post<any>(`${environment.serverUrl}/auth/forget-password`, {username});
  }

  refreshToken(token: string) {
    return this.http.post<any>(`${environment.serverUrl}/auth/token`, {token})
      .pipe(map(currentUser => {
        if (localStorage.getItem('currentUser')) {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
          sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        this.currentUserSubject.next(currentUser);

        return currentUser;
      }));
  }

  addAuthorizationHeader(request: HttpRequest<unknown>) {
    const currentUser = this.currentUserSubject.value;

    if (currentUser && currentUser.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.accessToken}`
        }
      });
    }
    return request;
  }

  socialLoginRedirect(social: any) {
    let state;
    if (social.callbackParams.includes('state')) {
      state = Math.random().toString(36);
      localStorage.setItem('loginSessionID', state);
    }

    return this.http.post<any>(`${environment.serverUrl}/social/login-url`, {key: social.tag, state});
  }

  socialLogin(key: string, params: { code?, state?, oauth_token?, oauth_verifier? }) {
    if (params.state) {
      if (localStorage.getItem('loginSessionID') !== params.state) {
        return throwError({error: 'Bad Credentials'});
      } else {
        localStorage.removeItem('loginSessionID');
      }
    }

    return this.http.post<any>(`${environment.serverUrl}/social/login`,
      {
        key,
        code: params.code,
        state: params.state,
        oauth_token: params.oauth_token,
        oauth_verifier: params.oauth_verifier
      }
    ).pipe(map(currentUser => {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.currentUserSubject.next(currentUser);

      // TODO: get second parameter from basic info db
      this.themeService.initTheme(false);
      this.themeService.initSideNavClosed(false);

      return currentUser;
    }));
  }
}
