import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component( {
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: [ './countdown.component.scss' ]
} )
export class CountdownComponent implements OnChanges {
  FULL_DASH_ARRAY = 283;

  @Input() warningThreshold;
  @Input() alertThreshold;

  colorCodes = {
    info: {
      color: 'green'
    },
    warning: {
      color: 'orange'
    },
    alert: {
      color: 'red'
    }
  };

  @Input() totalTime: number = undefined;
  @Input() timeLeft: number = undefined;
  remainingPathColor;

  constructor() {
    // Intentionally blank
  }

  ngOnChanges( _: SimpleChanges ): void {
    if ( !this.warningThreshold || !this.alertThreshold ) {
      this.warningThreshold = this.totalTime * 2 / 3;
      this.alertThreshold = this.totalTime / 3;
    }

    this.setCircleDasharray();
    this.setRemainingPathColor( this.timeLeft );
  }

  setRemainingPathColor( timeLeft ) {
    const { alert, warning, info } = this.colorCodes;
    if ( timeLeft <= this.alertThreshold ) {
      this.remainingPathColor = alert.color;
    } else if ( timeLeft <= this.warningThreshold ) {
      this.remainingPathColor = warning.color;
    } else {
      this.remainingPathColor = info.color;
    }
  }

  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this.totalTime;
    return rawTimeFraction === 0 ? 0 : rawTimeFraction - ( 1 / this.totalTime ) * ( 1 - rawTimeFraction );
  }

  setCircleDasharray() {
    const circleDasharray = `${ (
        this.calculateTimeFraction() * this.FULL_DASH_ARRAY
    ).toFixed( 0 ) } 283`;
    document
    .getElementById( 'base-timer-path-remaining' )
    .setAttribute( 'stroke-dasharray', circleDasharray );
  }

}

