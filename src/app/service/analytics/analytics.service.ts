import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoadingService } from '../loading/loading.service';

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
