import { Component, Input } from '@angular/core';
import { PRODUCT_LINES } from '../../../data/product/product.data';
import { DEFAULT_SYSTEM_STATUS } from '../../../data/status/status.data';

@Component( {
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: [ './status-card.component.scss' ]
} )
export class StatusCardComponent {
  @Input() overallSystemStatus = DEFAULT_SYSTEM_STATUS;

  PRODUCT_LINES = PRODUCT_LINES;

  constructor() {
    // Intentionally blank
  }

  setStatusLed( status: string ) {
    switch ( status ) {
      case 'UP': {
        return 'success';
      }
      case 'WARN': {
        return 'warning animate';
      }
      case 'DOWN': {
        return 'error animate';
      }
      default: {
        return 'info animate';
      }
    }
  }
}
