import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { SocketService } from './service/socket/socket.service';
import { ThemeService } from './service/theme/theme.service';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent {

  darkLightSetting: string;
  themeColorSetting: string;
  themeDesignSetting: string;

  constructor(
      private themeService: ThemeService,
      private socketService: SocketService,
      private googleTagManagerService: GoogleTagManagerService,
      private router: Router ) {

    this.router.events.forEach( item => {
      if ( item instanceof NavigationEnd ) {

        const googleTagManagerTag = {
          event: 'page',
          pageName: item.url
        };

        this.googleTagManagerService.pushTag( googleTagManagerTag );
      }
    } );

    this.themeService.darkLightSetting.subscribe( darkLightSetting => {
      this.darkLightSetting = darkLightSetting;
    } );

    this.themeService.themeColorSetting.subscribe( themeColorSetting => {
      this.themeColorSetting = themeColorSetting;
    } );

    this.themeService.themeDesignSetting.subscribe( themeDesignSetting => {
      this.themeDesignSetting = themeDesignSetting;
    } );
  }

  setTheme() {
    let themeConfig = 'default-theme';

    if ( this.themeColorSetting ) {
      themeConfig = this.themeColorSetting;
    }

    if ( this.themeDesignSetting ) {
      themeConfig += ' ' + this.themeDesignSetting;
    }

    return themeConfig;
  }
}