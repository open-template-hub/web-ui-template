import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent {
  @Input() events: any[] = []

  timestampToString( timestamp: any ): string {
    return new Date( timestamp ).toLocaleString()
  }
}
