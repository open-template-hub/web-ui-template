import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
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
import { ThemeService } from '../../../service/theme/theme.service';
import { UserActivityService } from '../../../service/user-activity/user-activity.service';
import { PROFILE_IMG, URLS } from '../../../util/constant';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit, OnDestroy {

  currentUser: AuthToken;
  userInfo: any = {};
  environment = environment;
  profileImg = PROFILE_IMG;
  loading = false;
  loadingCount = false;
  loadingLessonsTaken = false;
  userInterests = [];
  attendedContributions;
  numberOfContributionsMade: number;
  numberOfContributionsTaken: number;
  topContributor: number;

  rate = 0;
  rateObject: Rate;

  showBadge = false;
  URLS = URLS;

  followerCount: number;
  followeeCount: number;

  lessonsInfo: any[] = [];
  contributionsInfo: any[] = [];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = false;

  colorScheme = {
    domain: [
      ''
    ]
  };

  lessonsTakenXAxisLabel = '# of lessons taken';

  contributionsXAxisLabel = '# of contributions.ts';

  eduMailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+\.edu\.[a-z]{2}$'

  formattedRateNumber: string;
  numberOfRate: number;

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
      private themeService: ThemeService,
      private userActivityService: UserActivityService) {
    this.loadingCount = true;
    this.loadingLessonsTaken = true

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
        this.contributionService.countUserContributions( userInfo.username ).subscribe( contributionList => {
          this.contributionsInfo = contributionList
          this.loadingCount = false;
        } )

        this.userActivityService.getContributionsTaken( userInfo.username ).subscribe( contributionList => {
          this.lessonsInfo = contributionList
          this.loadingLessonsTaken = false
        } )

        this.followerService.count( userInfo.username ).subscribe( followerCount => {
          this.followerCount = followerCount[ 0 ].count;
        } );

        this.followeeService.count( userInfo.username ).subscribe( followeeCount => {
          this.followeeCount = followeeCount[ 0 ].count;
        } );

        this.userActivityService.getNumberOfContributionsTaken( userInfo.username ).subscribe( result => {
          this.numberOfContributionsTaken = result[0].numberOfContributionsTaken
        })

        if ( userInfo.payload?.contributorProfileActivated ) {
          this.userActivityService.getNumberOfContributionsMade( userInfo.username ).subscribe( result => {
            this.numberOfContributionsMade = result.numberOfContributionsMade
          } )

          this.userActivityService.getContributorRate( userInfo.username ).subscribe( rate => {
            /*this.rate = Math.round(rate.userRating / rate.numberOfRates * 2) / 2;
            this.numberOfRate = rate.numberOfRates
            this.formattedRateNumber = this.userActivityService.formatNumberOfRates( rate.numberOfRates );*/
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
          /*this.rate = 0
          this.numberOfRate = undefined
          this.formattedRateNumber = undefined*/
          this.rateObject = undefined
          this.topContributor = undefined
        }

        this.categoryService.getCategoriesFromId( this.userInfo.payload?.interests ).subscribe( result => {
          this.userInterests = result;
        } );
      }
    } );

    this.loadingService.sharedLoading.subscribe( loading => this.loading = loading );

    this.fileStorageService.sharedProfileImage.subscribe( profileImg => {
      if ( profileImg?.file?.data ) {
        this.profileImg = 'data:image/png;base64,' + profileImg.file.data;
      }
    } );
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.informationService.clearInformation();
  }

  goToUrl( url: string ) {
    window.open( url, '_blank' );
  }

  barCustomColors( array: any[] ) {
    const result: any[] = [];
    const style = getComputedStyle( document.body )

    for (let i = 0; i < array.length; i++) {
      result.push({name: array[i].name, value: style
        .getPropertyValue( this.themeService.colors[ Math.floor( i / 2 ) ] )});
    }

    return result;
  }

  onRateClick( value: number ) {
  }
}
