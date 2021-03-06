import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../../service/theme/theme.service';

@Component( {
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: [ './dashboard-layout.component.scss' ]
} )
export class DashboardLayoutComponent implements OnInit {

  darkTheme: string;

  brand = {
    brandLogo: '',
  };

  sideNavClosed = 'false';

  constructor(
      private router: Router,
      private themeService: ThemeService
  ) {
    this.themeService.darkTheme.subscribe( darkTheme => {
      this.darkTheme = darkTheme;
    } );

    this.themeService.sideNavClosed.subscribe( sideNavClosed => {
      this.sideNavClosed = sideNavClosed;
    } );

    this.brand = this.themeService.brand;
  }

  ngOnInit(): void {
  }
}
