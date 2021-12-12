import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DEFAULT_SYSTEM_STATUS } from '../../data/status/status.data';

@Injectable( {
  providedIn: 'root'
} )
export class MonitoringService {

  public systemStatuses: Observable<any>;
  private systemStatusesSubject: BehaviorSubject<any>;

  constructor( private http: HttpClient ) {
    this.systemStatusesSubject = new BehaviorSubject<any>( undefined );
    this.systemStatuses = this.systemStatusesSubject.asObservable();
  }

  alive() {
    const observer = {
      next: response => this.systemStatusesSubject.next( response ),
      error: error => this.systemStatusesSubject.next( error )
    };

    return this.http.get<any>( `${ environment.serverUrl }/monitor/alive` ).subscribe( observer );
  }

  parseSystemStatuses(systemStatuses) {
    let overallSystemStatus = DEFAULT_SYSTEM_STATUS;

    if ( !systemStatuses ) {
      return;
    } else if ( systemStatuses instanceof HttpErrorResponse && systemStatuses.statusText === 'Unknown Error' ) {
      overallSystemStatus = DEFAULT_SYSTEM_STATUS;
      overallSystemStatus.checkDate = new Date();
      overallSystemStatus.overall = 'WARN';

      for ( const systemStatus of overallSystemStatus.systemStatuses ) {
        systemStatus.overall = 'WARN';
        for ( const status of systemStatus.statuses ) {
          status.alive = 'WARN';
        }
      }
      return;
    }

    overallSystemStatus = {
      systemStatuses: [],
      overall: '',
      checkDate: undefined
    };

    for ( const systemStatusKey in systemStatuses ) {
      if ( !systemStatuses[ systemStatusKey ] ) {
        continue;
      }

      const systemStatus = {
        name: systemStatusKey,
        overall: '',
        statuses: []
      };

      for ( const status in systemStatuses[ systemStatusKey ] ) {
        if ( !systemStatuses[ systemStatusKey ][ status ] ) {
          continue;
        }

        let name = status[ 0 ].toUpperCase();

        if ( status.length > 1 ) {
          name += status.substring( 1 ).split( /(?=[A-Z])/ ).join( ' ' );
        }

        systemStatus.statuses.push( {
          name,
          alive: systemStatuses[ systemStatusKey ][ status ].alive
        } );

        if ( systemStatuses[ systemStatusKey ][ status ].alive !== 'UP' ) {
          systemStatus.overall = systemStatuses[ systemStatusKey ][ status ].alive;
          overallSystemStatus.overall = systemStatuses[ systemStatusKey ][ status ].alive;
        }
      }
      if ( !systemStatus.overall ) {
        systemStatus.overall = 'UP';
      }

      overallSystemStatus.systemStatuses.push( systemStatus );
    }

    if ( !overallSystemStatus.overall ) {
      overallSystemStatus.overall = 'UP';
    }

    overallSystemStatus.checkDate = new Date();

    return overallSystemStatus
  }
}
