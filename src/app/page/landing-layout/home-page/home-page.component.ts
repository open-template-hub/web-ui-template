import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NpmProviderService } from 'src/app/service/provider/npm-provider.service';
import { environment } from '../../../../environments/environment';
import { environmentCommon } from '../../../../environments/environment-common';
import { BRAND } from '../../../data/brand/brand.data';
import { URLS } from '../../../data/navigation/navigation.data';
import { PRODUCT_LINES } from '../../../data/product/product.data';
import { DEFAULT_SYSTEM_STATUS } from '../../../data/status/status.data';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { MonitoringService } from '../../../service/monitoring/monitoring.service';
import { GithubProviderService } from '../../../service/provider/github-provider.service';

@Component( {
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [ './home-page.component.scss' ],
} )
export class HomePageComponent {

  isCountersLoading = true;

  BRAND = BRAND;
  URLS = URLS;
  PRODUCT_LINES = PRODUCT_LINES;

  environment = environment;
  environmentCommon = environmentCommon;
  overallSystemStatus = DEFAULT_SYSTEM_STATUS;
  counters: any;

  screenshots = [
    {
      src: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/demo/ui/web-ui-demo-light.min.png',
      description: $localize`:@@userInterfaces.webUITemplate.screenshot.1:Responsive Design`
    },
    {
      src: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/demo/ui/web-ui-demo-dark.min.png',
      description: $localize`:@@userInterfaces.webUITemplate.screenshot.2:Dark Mode Support`
    },
    {
      src: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/demo/ui/screenshots/web-ui-screenshot-1.min.png',
      description: $localize`:@@userInterfaces.webUITemplate.screenshot.3:Integrated With OTH Servers`
    },
    {
      src: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/demo/ui/screenshots/web-ui-screenshot-2.min.png',
      description: $localize`:@@userInterfaces.webUITemplate.screenshot.4:Customisable Theme Colors`
    },
    {
      src: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/demo/ui/screenshots/web-ui-screenshot-3.min.png',
      description: $localize`:@@userInterfaces.webUITemplate.screenshot.5:Customisable Theme Design`
    }
  ];

  whatIsWebUITemplateTitle = [
    { text: $localize`:@@homePage.whatIsWebUITemplateTitle.1:What is Web UI Template?`, level: 2 },
    { text: $localize`:@@homePage.whatIsWebUITemplateTitle.2:Web UI Template is modern, responsive and customisable web ui template for your business. It contains reusable components, theme color and design support along with dark theme support.` }
  ];

  integratedWithTitle = [
    { text: $localize`:@@homePage.integratedWithTitle.1:Integrated With`, level: 2 },
    { text: $localize`:@@homePage.integratedWithTitle.2:Web UI Template is already integrated with our other open source products. Start using Web UI Template to interact with them.` }
  ];

  statusTitle = [
    { text: $localize`:@@status.appHero:System Status`, level: 2 },
    { text: $localize`:@@status.statusTitle.2:Before testing Web UI, make sure other Open Template Hub products are up and running.` }
  ];

  constructor(
      private formBuilder: FormBuilder,
      public router: Router,
      private authenticationService: AuthenticationService,
      private npmProviderService: NpmProviderService,
      private monitoringService: MonitoringService,
      private githubService: GithubProviderService,
  ) {
    // redirect to home if already logged in
    if ( this.authenticationService.currentUserValue ) {
      this.router.navigate( [ URLS.dashboard.root ] );
    }

    this.monitoringService.alive();

    this.monitoringService.systemStatuses.subscribe( systemStatuses => {
      const overallSystemStatus = this.monitoringService.parseSystemStatuses( systemStatuses );

      if ( overallSystemStatus ) {
        this.overallSystemStatus = overallSystemStatus;
      }
    } );

    this.githubService.getGithubCounters( 'web-ui-template' )
    .then( counters => {
      this.isCountersLoading = false;
      this.counters = counters;
    } )
    .catch( error => {
      this.isCountersLoading = false;
      console.error( 'Error while getting Github Counters for product: ', 'web-ui-template', error );
    } );
  }

  getPresentationCardFooter( isOpenSource: boolean ): string {
    return isOpenSource ? $localize`:@@productTypeTag.openSource:opensource` : $localize`:@@productTypeTag.premium:premium`;
  }
}
