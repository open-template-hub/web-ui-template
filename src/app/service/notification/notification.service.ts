import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../auth/authentication.service';
import { SocketService } from '../socket/socket.service';

@Injectable( {
  providedIn: 'root'
} )
export class NotificationService {

  public notifications: Observable<any>;
  public notificationsSubject: BehaviorSubject<any>;

  constructor(
      private http: HttpClient,
      private socketService: SocketService,
      private authenticationService: AuthenticationService
  ) {
    this.notificationsSubject = new BehaviorSubject<any>( [] );
    this.notifications = this.notificationsSubject.asObservable();

    this.authenticationService.currentUser.subscribe( currentUser => {
      if ( !currentUser ) {
        this.logout();
      }
    } );

    this.socketService.notification.subscribe( () => {
      this.getNotifications();
    } );
  }

  readNotification( index: any ) {
    const notification = this.notificationsSubject.value[ index ];
    if ( !notification || notification.read ) {
      return;
    }

    // TODO: Update database too
    notification.read = true;

    this.notificationsSubject.next( this.notificationsSubject.value );
  }

  getNotifications() {

    this.http.get<any>( `${ environment.serverUrl }/notification/me` ).subscribe( response => {
      this.notificationsSubject.next( response );
    } );
  }

  logout() {
    this.notificationsSubject.next( [] );
  }
}
