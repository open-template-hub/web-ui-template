import { Component } from '@angular/core';
import { NotificationService } from '../../../service/notification/notification.service';

@Component( {
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: [ './notifications-page.component.scss' ]
} )
export class NotificationsPageComponent {

  notifications: any[] = [];

  constructor( private notificationService: NotificationService ) {
    this.notificationService.notifications.subscribe( notifications => {
      this.notifications = notifications;
    } );
  }

  read( index: any ) {
    this.notificationService.readNotification( index );
  }

  timestampToDate( timestamp: any ): Date {
    return new Date( timestamp );
  }
}
