import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthToken } from '../model/AuthToken';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<AuthToken>;
  public currentUser: Observable<AuthToken>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthToken>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthToken {
    return this.currentUserSubject.value;
  }

  signUp(username: string, email: string, password: string) {
    return this.http.post<any>(`${environment.authServerUrl}/auth/signup`, {username, email, password});
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.authServerUrl}/auth/login`, {username, password})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  verify(token: string) {
    return this.http.get<any>(`${environment.authServerUrl}/auth/verify`, {params: {token: token}});
  }
}
