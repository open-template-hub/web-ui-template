import { Component } from '@angular/core';
import { DEFAULT_SYSTEM_STATUS } from '../../../data/status/status.data';
import { MonitoringService } from '../../../service/monitoring/monitoring.service';

@Component( {
  selector: 'app-status-page',
  templateUrl: './status-page.component.html',
  styleUrls: [ './status-page.component.scss' ]
} )
export class StatusPageComponent {

  overallSystemStatus = DEFAULT_SYSTEM_STATUS;

  constructor( private monitoringService: MonitoringService ) {
    this.monitoringService.alive();

    this.monitoringService.systemStatuses.subscribe( systemStatuses => {
      const overallSystemStatus = this.monitoringService.parseSystemStatuses( systemStatuses );

      if ( overallSystemStatus ) {
        this.overallSystemStatus = overallSystemStatus;
      }
    } );
  }
}
