import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable( {
  providedIn: 'root',
} )
export class AnalyticsService {
  constructor(
      private http: HttpClient,
  ) {
  }

  logRegisteredUser( data: any ) {
    data.name = environment.clientUrl
    return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data);
  }

  getEvents( start: number, limit: number ) {
    return this.http.get<any>( `${ environment.serverUrl }/analytics/event?start=${ start }&limit=${ limit }`)
  }
}
