import { Component, OnInit } from '@angular/core';
import { ContributionService } from '../../../service/contribution/contribution.service';

@Component( {
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: [ './showroom.component.scss' ]
} )
export class ShowroomComponent implements OnInit {

  contributions: any;

  constructor(
      private contributionService: ContributionService
  ) {
  }

  ngOnInit(): void {
    this.contributionService.search( undefined, undefined, new Date().toISOString(), undefined,
        [] ).subscribe( results => {
      this.contributions = results;
    } );
  }
}
