import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { URLS } from '../../data/navigation/navigation.data';

@Injectable( {
  providedIn: 'root'
} )
export class NotificationService {

  public notifications: Observable<any>;
  public notificationsSubject: BehaviorSubject<any>;

  // TODO: Collect notifications from database
  private testNotifications = [
    { read: true, date: new Date(), message: 'Welcome to Open Template Hub!', link: URLS.dashboard.root },
    { read: false, date: new Date(), message: 'Buy premium today!', link: URLS.dashboard.premium },
    { read: false, date: new Date(), message: 'Social Login Activity', link: URLS.settings.editSecurity },
  ];

  constructor() {
    this.notificationsSubject = new BehaviorSubject<any>( this.testNotifications );
    this.notifications = this.notificationsSubject.asObservable();
  }

  logout() {
    this.notificationsSubject.next( [] );
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
}