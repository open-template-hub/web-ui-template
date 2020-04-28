import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../service/theme/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  darkTheme: string;

  sideNavClosed = 'false';

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {
    this.themeService.darkTheme.subscribe(darkTheme => {
      this.darkTheme = darkTheme;
    });

    this.themeService.sideNavClosed.subscribe(sideNavClosed => {
      this.sideNavClosed = sideNavClosed;
    });
  }

  ngOnInit(): void {
  }
}
