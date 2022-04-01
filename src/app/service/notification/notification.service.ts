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

    // TODO: Get notifications from server, socket added for test purpose only
    this.socketService.socketActivityListSubject.subscribe( socketActivity => {
      this.notificationsSubject.next( socketActivity );
    } );
  }

  logout() {
    this.notificationsSubject.next( [] );
  }
}
