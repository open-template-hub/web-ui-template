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
    return this.http.post<any>( `${ environment.serverUrl }/analytics/event`, data);
  }
}
