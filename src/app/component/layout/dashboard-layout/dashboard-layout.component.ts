import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../service/theme/theme.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  darkTheme: string;

  constructor(private themeService: ThemeService) {
    this.themeService.darkTheme.subscribe(darkTheme => {
      this.darkTheme = darkTheme;
    });
  }

  ngOnInit(): void {
  }
}
