import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthToken } from '../../model/AuthToken';
import { map } from 'rxjs/operators';

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

  constructor(private apollo: Apollo) {

    this.userInfoSubject = new BehaviorSubject<any>({});
    this.userInfo = this.userInfoSubject.asObservable();
  }

  getUserInfo(currentUser: AuthToken) {
    return this.apollo.query<any>(
      {
        query: GetUserInfo,
        context: {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`
          }
        },
        fetchPolicy: 'network-only'
      }
    ).pipe(map(response => {
      if (response.data.me) {
        this.userInfoSubject.next(response.data.me);
        return response.data.me;
      }
      return {};
    }));
  }
}
