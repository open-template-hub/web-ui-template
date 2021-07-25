import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { environment } from '../../../../environments/environment';
import { CalendarEvent } from '../../../component/common/calendar/calendar.component';
import { Rate } from '../../../component/common/rate-bar/rate-bar.component';
import { AuthToken } from '../../../model/AuthToken';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { BasicInfoService } from '../../../service/basic-info/basic-info.service';
import { CategoryService } from '../../../service/category/category.service';
import { ContributionService } from '../../../service/contribution/contribution.service';
import { FileStorageService } from '../../../service/file-storage/file-storage.service';
import { FolloweeService } from '../../../service/followee/followee.service';
import { FollowerService } from '../../../service/follower/follower.service';
import { InformationService } from '../../../service/information/information.service';
import { LoadingService } from '../../../service/loading/loading.service';
import { UserActivityService } from '../../../service/user-activity/user-activity.service';
import { ContributionTypes, PROFILE_IMG, URLS } from '../../../util/constant';

@Component( {
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
} )
export class DashboardComponent implements OnInit, OnDestroy {

  currentUser: AuthToken;
  userInfo: any = {};
  environment = environment;
  profileImg = PROFILE_IMG;
  loading = false;
  userInterests = [];
  attendedContributions = [];
  myRecentlyCompletedContributions = [];
  myUpcomingContributions = [];
  unratedContributions = [];

  URLS = URLS;

  followerCount: number;
  followeeCount: number;

  rate = 0;
  formattedRateNumber: string;
  numberOfRate: number;

  rateObject: Rate;

  numberOfContributionsMade: number;
  numberOfContributionsTaken: number;
  topContributor: number;

  calendarEvents: CalendarEvent[] = []
  events: CalendarEvent[] = []

  /*
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [],
    //dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    expandRows: false,
    forceEventDuration: true,
    defaultTimedEventDuration: '01.00',
    displayEventTime: true,
    datesSet: ( data => {
      const startDate = data.start.toDateString()
      const endDate = data.end.toDateString()
      this.getUserContributionsWithDate( startDate, endDate )
      this.getAttendedContributionsWithDate( startDate, endDate )
    } )
  }*/

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private loadingService: LoadingService,
      private basicInfoService: BasicInfoService,
      private fileStorageService: FileStorageService,
      private informationService: InformationService,
      private categoryService: CategoryService,
      private followerService: FollowerService,
      private followeeService: FolloweeService,
      private contributionService: ContributionService,
      private userActivityService: UserActivityService
  ) {

    this.contributionService.getContributions().subscribe( contributions => {
      console.log(contributions)
    })
    this.authenticationService.currentUser.subscribe( currentUser => {
          this.currentUser = currentUser;
        }
    );

    this.basicInfoService.userInfo.subscribe( userInfo => {
      this.userInfo = userInfo;

      // check interests area defined before service calling.
      if ( this.userInfo?.payload?.interests ) {
        this.categoryService.getCategoriesFromId( this.userInfo?.payload?.interests ).subscribe( result => {
          this.userInterests = result;
        } );
      }

      if ( userInfo?.username ) {
        this.userActivityService.getNumberOfContributionsTaken( userInfo.username ).subscribe( result => {
          this.numberOfContributionsTaken = result[0].numberOfContributionsTaken
        })

        if ( userInfo.payload?.contributorProfileActivated ) {
          this.userActivityService.getNumberOfContributionsMade( userInfo.username ).subscribe( result => {
            this.numberOfContributionsMade = result.numberOfContributionsMade
          } )

          this.userActivityService.getContributorRate( userInfo.username ).subscribe( rate => {
            /*
            this.rate = Math.round(rate.userRating / rate.numberOfRates * 2) / 2;
            this.numberOfRate = rate.numberOfRates
            this.formattedRateNumber = this.userActivityService.formatNumberOfRates( rate.numberOfRates );*/
            console.log(rate)
            this.rateObject = {
              userRating: rate.userRating,
              numberOfRates: rate.numberOfRates
            }
          })

          this.userActivityService.getTopContributors().subscribe( topContributors => {
            topContributors.forEach( ( value, index ) => {
              if( value.username === userInfo.username ) {
                this.topContributor = index;
              }
            } );
          })
        } else {
          this.numberOfContributionsMade = undefined
          /*
          this.rate = 0
          this.numberOfRate = undefined
          this.formattedRateNumber = undefined*/
          this.rateObject = undefined
          this.topContributor = undefined
        }
      }
    } );

    this.loadingService.sharedLoading.subscribe( loading => this.loading = loading );

    this.basicInfoService.me()
    .subscribe( userInfo => {
          this.userInfo = userInfo;

          if ( !this.userInfo.payload ) {
            this.basicInfoService.createMyInfo()
            .subscribe( () => {
                  this.router.navigate( [ URLS.settings.welcome ] );
                }
            );
          } else {
            this.followerService.count( userInfo.username ).subscribe( followerCount => {
              this.followerCount = followerCount[ 0 ].count;
            } );

            this.followeeService.count( userInfo.username ).subscribe( followeeCount => {
              this.followeeCount = followeeCount[ 0 ].count;
            } );

            this.fetchUnratedCompletedContributions()

            this.categoryService.getCategoriesFromId( this.userInfo?.payload?.interests ).subscribe( result => {
              this.userInterests = result;
            } );

            if ( this.userInfo?.payload?.profileImageId ) {
              this.fileStorageService.downloadProfileImage( this.userInfo.payload.profileImageId ).subscribe();
            }

            const userInterests = userInfo?.payload?.interests;
            const categories: any[] = [];

            if ( userInterests && userInterests.length > 0 ) {
              for ( const interest of userInterests ) {
                categories.push(
                    {
                      category: interest.category,
                      subCategory: interest.subCategory,
                      leafCategory: interest.leafCategory
                    }
                );
              }
            }

            this.contributionService.initSearchContributions( categories );
          }
        }
    );

    this.contributionService.attendedContributions.subscribe( attendedContributions => {
      this.attendedContributions = attendedContributions;
    } );

    //this.contributionService.getAttendedContributions().subscribe();

    this.fileStorageService.sharedProfileImage.subscribe( profileImg => {
      if ( profileImg?.file?.data ) {
        this.profileImg = 'data:image/png;base64,' + profileImg.file.data;
      }
    } );
  }

  updateCalendar( contributions: any[], backgroundColor: 'red' | 'blue' ) {
    if ( contributions === null ) { return }

    contributions.forEach( (contribution, index) => {
      const start = formatDate( new Date( contribution.date ), 'yyyy-MM-dd HH:mm', 'en-US' );
      const end = formatDate( new Date( new Date( contribution.date ).getTime() + contribution.duration * 60000 ), 'yyyy-MM-dd HH:mm', 'en-US' );
      this.calendarEvents.push( { id: contribution._id, title: contribution.title, start, end, backgroundColor } )
      this.events = [...this.calendarEvents]
    });

    /*this.calendarOptions = {
        initialView: 'dayGridMonth',
        events: [...this.calendarEvents],
        forceEventDuration: true,
        defaultTimedEventDuration: '01.00',
        //dateClick: this.handleDateClick.bind(this),
        displayEventTime: true,
        expandRows: false,
        eventClick: this.handleEventClick.bind(this),
        datesSet: ( data => {
          this.calendarEvents = []
          const startDate = data.start.toDateString()
          const endDate = data.end.toDateString()
          this.getUserContributionsWithDate( startDate, endDate )
          this.getAttendedContributionsWithDate( startDate, endDate )
        } )
      }*/
  }

  datesSet( data ) {
    this.calendarEvents = []
    const startDate = data.start.toDateString()
    const endDate = data.end.toDateString()
    this.getUserContributionsWithDate( startDate, endDate )
    this.getAttendedContributionsWithDate( startDate, endDate )
  }

  ngOnInit(): void {
    this.getUserContributions();
  }

  getUserContributions() {
    this.contributionService.me( 'true' )
    .subscribe( myContributions => {
      this.myUpcomingContributions = myContributions;
    } );

    this.contributionService.me('false')
    .subscribe( myRecentlyCompletedContributions => {
      this.myRecentlyCompletedContributions = myRecentlyCompletedContributions
    } )
  }

  getUserContributionsWithDate( startDate: string, endDate: string ) {
    this.contributionService.me( 'false', 'false', startDate, endDate ).subscribe( contributions => {
      this.updateCalendar( contributions, 'red' )
    } )
  }

  getAttendedContributionsWithDate( startDate: string, endDate: string ) {
    this.contributionService.getAttendedContributions( startDate, endDate ).subscribe( contributions => {
      this.updateCalendar( contributions, 'blue' )
    } )
  }

  ngOnDestroy() {
    this.informationService.clearInformation();
    this.contributionService.resetContributions( ContributionTypes.Attended );
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

  handleEventClick(arg) {
    this.router.navigate( [ URLS.dashboard.contribution ], { queryParams: { contribution_id: arg.event.id } } );
  }

  goToUrl( url: string ) {
    window.open( url, '_blank' );
  }

  fillForm(id: string) {
    this.router.navigate( [ URLS.dashboard.contribute ], { queryParams: { contribution_id: id, editable: true } } );
  }

  markAsCompletedButtonClicked( event: string ) {
    // remove the item from recentlyPassedContributions
    this.myRecentlyCompletedContributions.forEach( ( item, index ) => {
      if ( item._id === event ) {
        this.myRecentlyCompletedContributions.splice( index, 1 )
      }
    } )

    // refresh passedContributions
    this.contributionService.me('false', 'true' )
    .subscribe( myPassedContributions => {
      this.myUpcomingContributions = myPassedContributions
    })
  }

  fetchUnratedCompletedContributions() {
    this.userActivityService.getUnratedCompletedContributions().subscribe( unratedContributions => {
      this.unratedContributions = unratedContributions[0].completedContributions
    } )
  }
}
