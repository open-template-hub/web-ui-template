import { Component } from '@angular/core';
import { PRODUCT_LINES } from 'src/app/data/product/product.data';
import { environmentCommon } from 'src/environments/environment-common';
import { COMPANY_PAGES } from '../../../data/company/company.data';
import { DEVELOPERS_PAGES } from '../../../data/developers/developers.data';
import { URLS } from '../../../data/navigation/navigation.data';
import { RESOURCES_PAGES } from '../../../data/resources/resources.data';
import { ProductLine } from '../../../model/product/product.model';

@Component( {
  selector: 'app-sitemap-page',
  templateUrl: './sitemap-page.component.html',
  styleUrls: [ './sitemap-page.component.scss' ]
} )
export class SitemapPageComponent {

  PRODUCT_LINES: ProductLine[] = PRODUCT_LINES;
  COMPANY_PAGES = COMPANY_PAGES;
  DEVELOPERS_PAGES = DEVELOPERS_PAGES;
  RESOURCES_PAGES = RESOURCES_PAGES;

  URLS = URLS;

  appVersion = '1.0.0';

  environmentCommon = environmentCommon;

  constructor() {
    // Intentionally blank
  }
}
