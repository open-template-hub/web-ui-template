import { Component } from '@angular/core';
import { PRODUCT_RIBBONS } from 'src/app/data/ribbon/ribbon.data';
import {
  premiumAccountPricingFeatures,
  premiumAccountPricingOptions
} from '../../../data/premium-products/premium-product.data';
import { ProductService } from '../../../service/product/product.service';

@Component( {
  selector: 'app-premium-page',
  templateUrl: './premium-page.component.html',
  styleUrls: [ './premium-page.component.scss' ]
} )
export class PremiumPageComponent {

  product = undefined;

  PRODUCT_RIBBONS = PRODUCT_RIBBONS;

  premiumAccountPricingFeatures = premiumAccountPricingFeatures;
  premiumAccountPricingOptions = premiumAccountPricingOptions;

  constructor( private productService: ProductService ) {
    this.productService.premiumProducts.subscribe( product => {
      this.product = product;
    } );
  }
}
