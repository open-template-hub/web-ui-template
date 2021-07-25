import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class FolloweeService {

  constructor(
      private http: HttpClient
  ) {
  }

  count( username: string ) {
    return this.http.get<any>( `${ environment.serverUrl }/followee/count?username=${ username }` );
  }
}
