import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BasicInfoService } from '../../../../service/basic-info/basic-info.service';
import { UserActivityService } from '../../../../service/user-activity/user-activity.service';
import { RIBBONS, URLS } from '../../../../util/constant';

@Component( {
  selector: 'app-contribution-card',
  templateUrl: './contribution-card.component.html',
  styleUrls: [ './contribution-card.component.scss' ]
} )
export class ContributionCardComponent implements OnInit {

  username: string;
  @Input() contribution: any;
  @Input() isPublicPage = false;
  @Input() isEditable = false;
  @Input() fillLayout = false;
  @Input() maxHeight = false;
  @Input() addMarginToDescription = false;
  @Input() profileImg;
  @Input() centeredTitle = false;
  @Input() showCalendar = true;
  @Input() markAsCompleted = false;
  @Input() inProgress = false;
  @Input() showHamburgerMenu = true;
  @Input() showRateBar = false;
  @Input() completed = false;

  @Output() itemIdForFillingForm = new EventEmitter<string>();
  @Output() markAsCompletedButtonClicked = new EventEmitter<string>();
  @Output() rateButtonClicked = new EventEmitter();

  safeYoutubeUrl: SafeResourceUrl;

  RIBBONS = RIBBONS;

  constructor(
      private router: Router,
      private basicInfoService: BasicInfoService,
      private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.basicInfoService.userInfo.subscribe( userInfo => {
      this.username = userInfo?.username;
    } );
    this.getUrl()
  }

  onClickHeader() {
    this.emitIdForFillingForm( this.contribution._id );
  }

  routeToContribution() {
    this.router.navigate( [ URLS.dashboard.contribution ], { queryParams: { contribution_id: this.contribution._id } } );
  }

  emitIdForFillingForm( event ): void {
    this.itemIdForFillingForm.emit( event );
  }

  emitIdForCompletedButton( event ): void {
    this.markAsCompletedButtonClicked.emit( event );
  }

  getUrl() {
    this.safeYoutubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.contribution.payload?.trailerVideoLink );
  }
}
