import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class FollowerService {

  constructor(
      private http: HttpClient
  ) {
  }

  follow( username: string ) {
    return this.http.get<any>( `${ environment.serverUrl }/follower/follow?username=${ username }` );
  }

  unfollow( username: string ) {
    return this.http.get<any>( `${ environment.serverUrl }/follower/unfollow?username=${ username }` );
  }

  count( username: string ) {
    return this.http.get<any>( `${ environment.serverUrl }/follower/count?username=${ username }` );
  }

  isFollowing( username: string ) {
    return this.http.get<any>( `${ environment.serverUrl }/follower/is-following?username=${ username }` );
  }
}
