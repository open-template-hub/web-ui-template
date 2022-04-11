import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/service/analytics/analytics.service';

@Component( {
  selector: 'app-analytics-event-card',
  templateUrl: './analytics-event-card.component.html',
  styleUrls: [ './analytics-event-card.component.scss' ]
} )
export class AnalyticsEventCardComponent implements OnInit {

  paginationConfig = {
    skip: 0,
    totalEventCount: undefined,
    currentPageCount: 1,
    limit: this.analyticsService.configs.editSecurityLimit,
    shouldShowNavigationBars: false,
    hasNextPage: false,
    hasPreviousPage: false
  };

  selectedCategory: any;
  selectedStartDate: Date;
  selectedEndDate: Date;

  categories: [];
  mappedCategories: any;

  currentDate = new Date();

  events: any[];

  constructor(
      // private scrollService: InfiniteScrollingService,
      private analyticsService: AnalyticsService
  ) {
    const startDate = new Date();
    startDate.setDate( startDate.getDate() - 7 );

    this.selectedStartDate = startDate;
    this.selectedEndDate = new Date();
  }

  ngOnInit(): void {

    this.analyticsService.getCategories().subscribe( response => {
      this.categories = response;
      this.mappedCategories = this.analyticsService.convertCategoriesToMappedObject( response );

      if ( response?.length > 0 ) {
        this.selectedCategory = response[ 0 ];
      }

      this.fetchAnalyticsEvent( this.paginationConfig.skip, this.paginationConfig.limit, () => {
        // Intentionally blank
      } );
    } );
  }

  fetchAnalyticsEvent( skip: number, limit: number, callback: ( _: void ) => void ) {
    this.analyticsService.getEvents(
        this.selectedCategory.key,
        this.selectedStartDate?.getTime(),
        this.selectedEndDate?.getTime(),
        skip,
        limit
    ).subscribe( response => {
      this.paginationConfig.totalEventCount = response.meta.count;
      if ( response.meta.limit ) {
        this.paginationConfig.limit = response.meta.limit;
      } else {
        this.paginationConfig.limit = this.analyticsService.configs.editSecurityLimit;
      }

      this.paginationConfig.skip = skip;
      this.setShouldShowNextAndPrevious();

      this.events = response.data;
      callback();
    } );
  }

  timestampToString( timestamp: any ): string {
    return new Date( timestamp ).toLocaleString();
  }

  goToNextPage() {
    if ( !this.paginationConfig.hasNextPage ) {
      return;
    }

    this.fetchAnalyticsEvent( this.paginationConfig.skip + this.paginationConfig.limit, this.paginationConfig.limit, () => {
      this.paginationConfig.currentPageCount += 1;
    } );
  }

  goToPreviousPage() {
    if ( !this.paginationConfig.hasPreviousPage ) {
      return;
    }

    this.fetchAnalyticsEvent( this.paginationConfig.skip - this.paginationConfig.limit, this.paginationConfig.limit, () => {
      this.paginationConfig.currentPageCount -= 1;
    } );
  }

  setShouldShowNextAndPrevious(): void {
    this.paginationConfig.hasNextPage = this.paginationConfig.skip + this.paginationConfig.limit < this.paginationConfig.totalEventCount;
    this.paginationConfig.hasPreviousPage = this.paginationConfig.skip - this.paginationConfig.limit >= 0;

    this.paginationConfig.shouldShowNavigationBars = this.paginationConfig.hasNextPage || this.paginationConfig.hasPreviousPage;
  }

  changeCategory( event: any ): void {
    const selectedIndex = event.srcElement.selectedIndex;
    this.selectedCategory = this.categories[ selectedIndex ];
    this.fetchAnalyticsEvent( 0, this.paginationConfig.limit, () => {
      this.paginationConfig.currentPageCount = 1;
    } );
  }

  changeStartDate( event: any ): void {
    const selectedDate = event.srcElement.valueAsDate;
    console.log( 'startDate: ', selectedDate );
    this.selectedStartDate = selectedDate;
    this.fetchAnalyticsEvent( 0, this.paginationConfig.limit, () => {
      this.paginationConfig.currentPageCount = 1;
    } );
  }

  changeEndDate( event: any ): void {
    const selectedDate = event.srcElement.valueAsDate;
    console.log( 'endDate: ', selectedDate );
    this.selectedEndDate = selectedDate;
    this.fetchAnalyticsEvent( 0, this.paginationConfig.limit, () => {
      this.paginationConfig.currentPageCount = 1;
    } );
  }
}
