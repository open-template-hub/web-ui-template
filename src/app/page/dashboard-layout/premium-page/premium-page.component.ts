import { Component } from '@angular/core';
import { ProductService } from '../../../service/product/product.service';

@Component( {
  selector: 'app-premium-page',
  templateUrl: './premium-page.component.html',
  styleUrls: [ './premium-page.component.scss' ]
} )
export class PremiumPageComponent {

  product = undefined;

  constructor( private productService: ProductService ) {
    this.productService.premiumProducts.subscribe( product => {
      this.product = product;
      console.log( this.product );
    } );
  }
}
