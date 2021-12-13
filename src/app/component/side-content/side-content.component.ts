import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { URLS } from '../../data/navigation/navigation.data';
import { AnalyticsService } from '../../service/analytics/analytics.service';
import { BusinessLogicService } from '../../service/business-logic/business-logic.service';

@Component( {
  selector: 'app-side-content',
  templateUrl: './side-content.component.html',
  styleUrls: [ './side-content.component.scss' ]
} )
export class SideContentComponent {

  userInfo: any = {};
  URLS = URLS;
  environment = environment;

  events: any[] = []

  constructor(
      private businessLogicService: BusinessLogicService,
      private analyticsService: AnalyticsService,
      private router: Router
  ) {
    this.businessLogicService.userInfo.subscribe( userInfo => {
      this.userInfo = userInfo;

      const timeStamp = new Date();
      timeStamp.setDate( timeStamp.getDate()- 10 );
      this.analyticsService.getEvents( timeStamp.getTime(), 50 ).subscribe( events => {
        this.events = events
      } );
    } );
  }

  openEventDetails( event ) {
    this.router.navigate( [ URLS.dashboard.event ], { queryParams: { event_id: event } } );
  }
}
