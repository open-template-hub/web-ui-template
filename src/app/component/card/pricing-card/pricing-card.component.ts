import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { URLS } from '../../../data/navigation/navigation.data';
import { PremiumProducts } from '../../../data/premium-products/premium-product.data';
import { PricingOption } from '../../../model/pricing/pricing.model';
import { PricingFeature } from '../../../model/product/product.model';
import { PaymentService } from '../../../service/payment/payment.service';

@Component( {
  selector: 'app-pricing-card',
  templateUrl: './pricing-card.component.html',
  styleUrls: [ './pricing-card.component.scss' ]
} )
export class PricingCardComponent {

  URLS = URLS;

  @Input() demoLink: string;

  @Input() pricingFeatures: PricingFeature[];

  @Input() pricingOption: PricingOption;

  constructor( private router: Router, private paymentService: PaymentService ) {
    // Intentionally blank
  }

  callToAction( link?: string ) {
    if ( link ) {
      this.redirect( link );
    } else if ( this.pricingOption.link ) {
      this.redirect( this.pricingOption.link );
    } else {
      this.buy();
    }
  }

  redirect( href: string ) {
    if ( href.startsWith( '/' ) ) {
      this.router.navigate( [ href ] );
    } else {
      window.location.href = href;
    }
  }

  buy() {
    this.paymentService.initPayment( environment.payment.stripe, PremiumProducts.premiumAccount, 1 );
  }
}
