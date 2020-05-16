import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthToken } from '../../model/AuthToken';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';
import { AuthenticationService } from '../auth/authentication.service';

const GetUserInfo = gql`
query {
  me {
    id
    username
    email
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class BasicInfoService {

  private userInfoSubject: BehaviorSubject<any>;
  public userInfo: Observable<any>;

  constructor(
    private apollo: Apollo,
    private loadingService: LoadingService,
    private authenticationService: AuthenticationService) {

    const userInfoStorageItem = localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : sessionStorage.getItem('userInfo');

    this.userInfoSubject = new BehaviorSubject<any>(JSON.parse(userInfoStorageItem));
    this.userInfo = this.userInfoSubject.asObservable();
  }

  getUserInfo(currentUser: AuthToken, retry: boolean = false) {

    console.log('refresh user data');

    this.loadingService.setLoading(true);
    return this.apollo.query<any>(
      {
        query: GetUserInfo,
        fetchPolicy: 'network-only',
        errorPolicy: 'all'
      }
    ).pipe(map(response => {
      this.loadingService.setLoading(false);
      if (response.data.me) {
        this.userInfoSubject.next(response.data.me);

        if (localStorage.getItem('currentUser')) {
          localStorage.setItem('userInfo', JSON.stringify(response.data.me));
        } else {
          sessionStorage.setItem('userInfo', JSON.stringify(response.data.me));
        }

        return response.data.me;
      }
      return {};
    }),
    catchError(err => {
      this.loadingService.setLoading(false);
      if (err.networkError?.error?.errors[0]?.extensions?.code === 'TOKEN_EXPIRED') {
        this.authenticationService.refreshToken(currentUser.refreshToken).subscribe(
          currentUser => {
            if (!retry) {
              this.getUserInfo(currentUser, true).subscribe( userInfo => {
                this.userInfoSubject.next(userInfo);

                if (localStorage.getItem('currentUser')) {
                  localStorage.setItem('userInfo', JSON.stringify(userInfo));
                } else {
                  sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                }
              });
            }
          }
        )
      }
      return throwError(err);
    })
    );
  }
}
