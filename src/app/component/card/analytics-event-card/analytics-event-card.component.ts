import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/service/analytics/analytics.service';

@Component({
  selector: 'app-analytics-event-card',
  templateUrl: './analytics-event-card.component.html',
  styleUrls: ['./analytics-event-card.component.scss']
})
export class AnalyticsEventCardComponent implements OnInit {
  skip = 0;
  totalEventCount;
  events: any[];
  currentPageCount = 1;

  eventConfig = {
    categories: [],
    limit: 12
  }

  shouldShowNext = false;
  shouldShowPrevious = false;

  selectedCategory;

  constructor(
    /*private scrollService: InfiniteScrollingService,*/
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit(): void {

    this.analyticsService.getConfig().subscribe( response => {
      console.log(response);

      this.eventConfig.categories = response.categories;
      this.eventConfig.limit = response.limit;

      this.selectedCategory = this.eventConfig.categories[0]

      this.fetchAnalyticsEvent(this.skip, this.eventConfig.limit, undefined, () => { });
    })


    /*this.scrollService.getObservable().subscribe(status => {
      console.log("scroll ", status);
      if(status) {
        this.endLimit += 10
        this.fetchAnalyticsEvent(this.endLimit)
      }
    })*/
  }

  fetchAnalyticsEvent(skip: number, limit: number, timeStamp: Date | undefined, callback: (_ : void) => void) {
    // const timeStamp = new Date();
    // timeStamp.setDate( timeStamp.getDate() - 10 );
    this.analyticsService.getEvents(
      this.selectedCategory.key, 
      timeStamp?.getTime(), 
      skip, 
      limit
    ).subscribe( response => {
      this.totalEventCount = response.meta.count;

      this.skip = skip;

      this.setShouldShowNextAndPrevious();

      this.events = response.data;
      callback()
    } );
  }
  
  timestampToString( timestamp: any ): string {
    return new Date( timestamp ).toLocaleString()
  }

  goToNextPage() {
    if( !this.shouldShowNext ) {
      return
    }

    this.fetchAnalyticsEvent(this.skip + this.eventConfig.limit, this.eventConfig.limit, undefined, () => {
      this.currentPageCount += 1;
    });
  }

  goToPreviousPage() {
    if( !this.shouldShowPrevious ) {
      return
    }

    this.fetchAnalyticsEvent(this.skip - this.eventConfig.limit, this.eventConfig.limit, undefined, () => {
      this.currentPageCount -= 1;
    });
  }

  setShouldShowNextAndPrevious(): void {
    this.shouldShowNext = this.skip + this.eventConfig.limit < this.totalEventCount;
    this.shouldShowPrevious = this.skip - this.eventConfig.limit >= 0
  }

  changeCategory(event: any): void {
    const selectedIndex = event.srcElement.selectedIndex;
    this.selectedCategory = this.eventConfig.categories[selectedIndex];
    this.fetchAnalyticsEvent(0, this.eventConfig.limit, undefined, () => { });
  }

  changeDate(event: any): void {
    const selectedDate = event.srcElement.valueAsDate;
    this.fetchAnalyticsEvent(0, this.eventConfig.limit, selectedDate, () => { });

  }
}
