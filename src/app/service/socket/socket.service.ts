import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class SocketService {

  private socket = undefined;

  public notifications: Observable<any>;
  public notificationsSubject: BehaviorSubject<any>;

  constructor() {
    this.notificationsSubject = new BehaviorSubject<any>( [] );
    this.notifications = this.notificationsSubject.asObservable();
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
      this.notificationsSubject.next( [ ...this.notificationsSubject.value, notification ] );
    } );
  }

  logout() {
    this.socket = undefined;
    this.notificationsSubject.next( [] );
  }
}
