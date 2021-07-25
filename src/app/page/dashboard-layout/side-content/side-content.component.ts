import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BasicInfoService } from '../../../service/basic-info/basic-info.service';
import { CategoryService } from '../../../service/category/category.service';
import { ContributionService } from '../../../service/contribution/contribution.service';
import { InformationService } from '../../../service/information/information.service';
import { ThemeService } from '../../../service/theme/theme.service';
import { URLS } from '../../../util/constant';

@Component( {
  selector: 'app-side-content',
  templateUrl: './side-content.component.html',
  styleUrls: [ './side-content.component.scss' ]
} )
export class SideContentComponent implements OnInit {

  darkTheme: string;
  userInfo: any = {};
  /*
  userSearchResults = [];
  categorySearchResults = [];
  contributionSearchResults = [];
  searchEnabled = true;*/
  URLS = URLS;
  recommendedContributions: any = [];
  recommendedContributionsByFollowingList: any = [];
  environment = environment;

  numberOfAttemptedRetrieveInitSearchContributions = 0;
  maxNumberOfServiceCall = 1;

  /*
  @ViewChild( 'searchArea' )
  searchArea: ElementRef;*/

  constructor(
      private themeService: ThemeService,
      private categoryService: CategoryService,
      private basicInfoService: BasicInfoService,
      private contributionService: ContributionService,
      private informationService: InformationService,
      private router: Router
  ) {
    this.themeService.darkTheme.subscribe( darkTheme => {
      this.darkTheme = darkTheme;
    } );

    this.basicInfoService.userInfo.subscribe( userInfo => {
      this.userInfo = userInfo;

      this.contributionService.recommendedContributions.subscribe( recommendedContributions => {
        if ( recommendedContributions ) {
          this.recommendedContributions = recommendedContributions;
        } else if ( this.numberOfAttemptedRetrieveInitSearchContributions < this.maxNumberOfServiceCall) {
          // purpose of this control is to fix side content is null when user refreshed the page outside of the dasboard page
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

          this.contributionService.initSearchContributions( categories )
          this.numberOfAttemptedRetrieveInitSearchContributions += 1
        }
      } );

      this.contributionService.recommendedContributionsByFollowingList.subscribe( recommendedContributions => {
        this.recommendedContributionsByFollowingList = recommendedContributions
      } )
    } );


  }

  ngOnInit(): void {
  }

  /*
  @HostListener( 'document:click', [ '$event' ] )
  onDocumentClick( event ) {
    if ( this.searchArea?.nativeElement.contains( event.target ) ) {
      this.searchEnabled = true;
    } else {
      this.searchEnabled = false;
    }
  }

  search( event: any ) {
    const q = event.target.value;

    if ( !q || q.length < 3 ) {
      this.userSearchResults = [];
      this.categorySearchResults = [];
      return;
    }

    this.basicInfoService.search( q ).subscribe( results => {
      this.userSearchResults = results.slice( 0, 10 );
    } );

    this.categoryService.search( q ).subscribe( results => {
      this.categorySearchResults = results.slice( 0, 10 );
    } );

    this.contributionService.search( undefined, undefined, new Date().toISOString(), q, [] )
    .subscribe( results => {
      this.contributionSearchResults = results;
    } );
  }*/

  openContributionDetails( event ) {
    this.router.navigate( [ URLS.dashboard.contribution ], { queryParams: { contribution_id: event } } );
  }
}
