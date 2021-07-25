import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicInfoService } from '../../../service/basic-info/basic-info.service';
import { ContributionService } from '../../../service/contribution/contribution.service';
import { FileStorageService } from '../../../service/file-storage/file-storage.service';
import { InformationService } from '../../../service/information/information.service';
import { ContributionTypes, PROFILE_IMG, URLS } from '../../../util/constant';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.scss']
})
export class ContributionComponent implements OnInit, OnDestroy {

  contribution;

  profileImg = PROFILE_IMG;
  PROFILE_IMG = PROFILE_IMG;
  isProfileImageLoading;

  URLS = URLS;
  completed = false;

  constructor(
    private route: ActivatedRoute,
    private contributionService: ContributionService,
    private basicInfoService: BasicInfoService,
    private fileStorageService: FileStorageService,
    private router: Router,
    private informationService: InformationService
  ) { }

  ngOnInit(): void {
    this.contributionService.searchedContributions.subscribe( searchedContribution => {
      this.isProfileImageLoading = true;
      if ( searchedContribution && searchedContribution.length > 0 ) {
        this.contribution = searchedContribution[0];
        if ( new Date() > new Date( new Date( this.contribution.date ).getTime() + this.contribution.duration * 60000 ) ) {
          this.completed = true;
        } else {
          this.completed = false;
        }

        this.basicInfoService.getUser( this.contribution.contributor.username )
        .subscribe( visitedUserInfo => {
          if ( visitedUserInfo.payload?.profileImageId ) {
            this.fileStorageService.downloadVisitedProfileImage( visitedUserInfo.payload?.profileImageId ).subscribe( profileImg => {
              this.profileImg = 'data:image/png;base64,' + profileImg.file.data;
              this.isProfileImageLoading = false;
            } );
          }
        });
      }
    } );

    this.route.queryParams.subscribe( params => {
      this.contributionService.search( params.contribution_id, undefined, undefined,
        undefined, [], ContributionTypes.Searched ).subscribe( response => {
      }, error => {
        this.router.navigate( [ URLS.dashboard.learn ] );
      } );
    } );
  };

  ngOnDestroy() {
    this.contributionService.resetContributions( ContributionTypes.Searched );
  }

  updateSearchedContributions( updatedContribution ) {
    this.contribution = updatedContribution;
  }

  fillForm() {
    this.router.navigate( [ URLS.dashboard.contribute ], { queryParams: { contribution_id: this.contribution._id, editable: true } } );
  }
}
