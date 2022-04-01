import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class SocketService {

  public users: Observable<any>;
  public usersSubject: BehaviorSubject<any>;

  public socketActivityList: Observable<any>;
  public socketActivityListSubject: BehaviorSubject<any>;

  private socket = undefined;

  constructor() {
    this.usersSubject = new BehaviorSubject<any>( [] );
    this.users = this.usersSubject.asObservable();

    this.socketActivityListSubject = new BehaviorSubject<any>( [] );
    this.socketActivityList = this.socketActivityListSubject.asObservable();
  }

  connectToSocket( accessToken ) {
    if ( accessToken && !this.socket ) {
      this.socket = io( environment.serverUrl, {
        auth: {
          token: accessToken
        }
      } );

      this.connectToMessages();
      this.connectToUsers();
    }
  }

  connectToMessages() {
    this.socket?.on( 'message', ( message ) => {
      this.socketActivityListSubject.next( [ ...this.socketActivityListSubject.value, message ] );
    } );
  }

  connectToUsers() {
    this.socket?.on( 'users', ( users ) => {
      this.usersSubject.next( users );
    } );
  }

  sendMessage( message: string ) {
    this.socket?.emit( 'message', message );
  }

  logout() {
    this.socket = undefined;
    this.usersSubject.next( [] );
    this.socketActivityListSubject.next( [] );
  }
}
