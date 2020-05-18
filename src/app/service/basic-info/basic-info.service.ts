import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { AuthToken } from '../../model/AuthToken';
import { map } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';

const InitUser = gql
  `mutation {
  initUser {
    username
  }
}
`

const CreateUser = gql
  `mutation CreateUser($username: String!) {
  createUser(input: {username: $username}) {
    username
  }
}
`

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
    private loadingService: LoadingService) {
  }

  initUserInfo() {
    this.loadingService.setLoading(true);
    return this.apollo.mutate(
      {
        mutation: InitUser,
        errorPolicy: 'all'
      }
    ).pipe(map(response => {
      this.loadingService.setLoading(false);
      if (response.data) {
        const responseData: any = response.data;
        return responseData.initUser;
      }

      return null;
    })
    );
  }

  createUserInfo(username: string) {

    this.loadingService.setLoading(true);
    return this.apollo.mutate(
      {
        mutation: CreateUser,
        variables: {
          username
        },
        errorPolicy: 'all'
      }
    ).pipe(map(response => {
      this.loadingService.setLoading(false);
      if (response.data) {
        const responseData: any = response.data;
        return responseData.createUser;
      }

      return null;
    })
    );
  }

  getUserInfo(currentUser: AuthToken) {

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
}
