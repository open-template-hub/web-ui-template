import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';
import { BehaviorSubject, Observable } from 'rxjs';

const InitUser = gql
 `mutation {
  initCurrentUser {
    username
  }
}
`

const UpdateUser = gql
 `mutation UpdateCurrentUser($firstName: String, $lastName: String) {
  updateCurrentUser(input: {firstName: $firstName, lastName: $lastName}) {
    username,
    firstName,
    lastName
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
    firstName
    lastName
  }
}
`;

@Injectable({
 providedIn: 'root'
})
export class BasicInfoService {

 private basicInfoSubject: BehaviorSubject<any>;
 public basicInfo: Observable<any>;

 constructor(
  private apollo: Apollo,
  private loadingService: LoadingService) {

  const basicInfoStorageItem = localStorage.getItem('basicInfo') ? localStorage.getItem('basicInfo') : sessionStorage.getItem('basicInfo');
  this.basicInfoSubject = new BehaviorSubject<any>(JSON.parse(basicInfoStorageItem));
  this.basicInfo = this.basicInfoSubject.asObservable();
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

 updateUserInfo(firstName: string, lastName: string) {

  this.loadingService.setLoading(true);
  return this.apollo.mutate(
   {
    mutation: UpdateUser,
    variables: {
     firstName,
     lastName
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

 getUserInfo() {

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
     const basicInfo = response.data.me;
     this.basicInfoSubject.next(basicInfo);

     if (localStorage.getItem('currentUser')) {
      localStorage.setItem('basicInfo', JSON.stringify(basicInfo));
     } else {
      sessionStorage.setItem('basicInfo', JSON.stringify(basicInfo));
     }

     return basicInfo;
    }

    return null;
   })
  );
 }

 logout() {
  this.basicInfoSubject.next(null);

 }
}
