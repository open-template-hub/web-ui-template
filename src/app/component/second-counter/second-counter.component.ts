import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-second-counter',
  templateUrl: './second-counter.component.html',
  styleUrls: ['./second-counter.component.scss']
})
export class SecondCounterComponent implements OnChanges {
  FULL_DASH_ARRAY = 283;

  @Input() warningThreshold = 85;
  @Input() alertThreshold = 80;
  
  colorCodes = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange"
    },
    alert: {
      color: "red"
    }
  };
  
  @Input() totalTime: number = undefined;
  @Input() timeLeft: number = undefined;
  remainingPathColor;
  
  constructor() { /*intentionally blank*/ }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.setCircleDasharray();
    this.setRemainingPathColor( this.timeLeft )
  }

  setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = this.colorCodes;
    console.log( 'Time Left: ', timeLeft );
    if (timeLeft <= this.alertThreshold) {
      console.log( 'alert' )
      this.remainingPathColor = alert.color;
    } else if (timeLeft <= this.warningThreshold) {
      console.log( 'warning' )
      this.remainingPathColor = warning.color;
    } else {
      this.remainingPathColor = info.color;
    }
  }
  
  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this.totalTime;
    return rawTimeFraction - (1 / this.totalTime) * (1 - rawTimeFraction);
  }
  
  setCircleDasharray() {
    const circleDasharray = `${(
      this.calculateTimeFraction() * this.FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }

}

