import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SocketService } from '../socket/socket.service';

@Injectable( {
  providedIn: 'root'
} )
export class NotificationService {

  public notifications: Observable<any>;
  public notificationsSubject: BehaviorSubject<any>;

  constructor( private socketService: SocketService ) {
    this.notificationsSubject = new BehaviorSubject<any>( [] );
    this.notifications = this.notificationsSubject.asObservable();

    this.socketService.notificationSubject.subscribe( notification => {
      if ( notification ) {
        this.notificationsSubject.next( [ ...this.notificationsSubject.value, notification ] );
      }
    } );
  }

  logout() {
    this.notificationsSubject.next( [] );
  }
}
