import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../service/theme/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-layout',
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.scss']
})
export class LandingLayoutComponent implements OnInit {

  darkTheme: string;
  brandLogo: string;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {
    this.themeService.darkTheme.subscribe(darkTheme => {
      this.darkTheme = darkTheme;
    });

    this.brandLogo = this.themeService.brandLogo;
  }

  ngOnInit(): void {
  }
}
