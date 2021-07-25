import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../service/theme/theme.service';

@Component( {
  selector: 'app-landing-layout',
  templateUrl: './raw-landing-layout.component.html',
  styleUrls: [ './raw-landing-layout.component.scss' ]
} )
export class RawLandingLayoutComponent implements OnInit {

  darkTheme: string;

  constructor(
      private router: Router,
      private themeService: ThemeService
  ) {
    this.themeService.darkTheme.subscribe( darkTheme => {
      this.darkTheme = darkTheme;
    } );
  }

  ngOnInit(): void {
  }
}
