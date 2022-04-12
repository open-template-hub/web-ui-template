import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class SocketService {

  public notification: Observable<any>;
  public notificationSubject: BehaviorSubject<any>;
  private socket = undefined;

  constructor() {
    this.notificationSubject = new BehaviorSubject<any>( undefined );
    this.notification = this.notificationSubject.asObservable();
  }

  // To activate socket use the following function
  connectToSocket( accessToken ) {
    if ( accessToken && !this.socket ) {
      this.socket = io( environment.serverUrl, {
        auth: { token: accessToken }
      } );

      this.connectToNotifications();
    }
  }

  connectToNotifications() {
    this.socket?.on( 'notification', ( notification ) => {
      this.notificationSubject.next( notification );
    } );
  }

  logout() {
    this.socket = undefined;
    this.notificationSubject.next( undefined );
  }
}
