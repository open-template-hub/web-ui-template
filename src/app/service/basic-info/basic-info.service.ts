import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { throwError } from 'rxjs';
import { AuthToken } from '../../model/AuthToken';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';
import { AuthenticationService } from '../auth/authentication.service';

const GetUserInfo = gql`
query {
  me {
    id
    username
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class BasicInfoService {

  constructor(
    private apollo: Apollo,
    private loadingService: LoadingService,
    private authenticationService: AuthenticationService) {
  }

  createUserInfo(currentUser: AuthToken, retry: boolean = false) {

    this.loadingService.setLoading(true);
    return this.apollo.query<any>(
      {
        query: GetUserInfo,
        fetchPolicy: 'network-only',
        errorPolicy: 'all'
      }
    ).pipe(map(response => {
      this.loadingService.setLoading(false);
      if (response.data) {
        return response.data.me;
      }

      return null;
    })
    );
  }

  getUserInfo(currentUser: AuthToken, retry: boolean = false) {

    this.loadingService.setLoading(true);
    return this.apollo.query<any>(
      {
        query: GetUserInfo,
        fetchPolicy: 'network-only',
        errorPolicy: 'all'
      }
    ).pipe(map(response => {
      this.loadingService.setLoading(false);
      if (response.data) {
        return response.data.me;
      }

      return null;
    }),
    catchError(err => {
      this.loadingService.setLoading(false);
      if (err.networkError?.error?.errors[0]?.extensions?.code === 'TOKEN_EXPIRED') {
        this.authenticationService.refreshToken(currentUser.refreshToken).subscribe(
          currentUser => {
            if (!retry) {
              this.getUserInfo(currentUser, true).subscribe( userInfo => {
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
