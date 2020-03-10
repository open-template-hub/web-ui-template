import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthToken } from '../../model/AuthToken';
import { map } from 'rxjs/operators';
import { ThemeService } from '../theme/theme.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<AuthToken>;
  public currentUser: Observable<AuthToken>;

  constructor(private http: HttpClient,
              private themeService: ThemeService) {
    const currentUserStorageItem = localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : sessionStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<AuthToken>(JSON.parse(currentUserStorageItem));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthToken {
    return this.currentUserSubject.value;
  }

  signUp(username: string, email: string, password: string) {
    return this.http.post<any>(`${environment.authServerUrl}/auth/signup`, {username, email, password});
  }

  login(username: string, password: string, rememberMe: boolean) {
    return this.http.post<any>(`${environment.authServerUrl}/auth/login`, {username, password})
      .pipe(map(currentUser => {
        if(rememberMe) {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
          sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        this.currentUserSubject.next(currentUser);

        // TODO: get second parameter from basic info db
        this.themeService.initDarkTheme(false);

        return currentUser;
      }));
  }

  logout() {
    this.themeService.clearThemes();

    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    } else {
      sessionStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  verify(token: string) {
    return this.http.get<any>(`${environment.authServerUrl}/auth/verify`, {params: {token: token}});
  }
}
