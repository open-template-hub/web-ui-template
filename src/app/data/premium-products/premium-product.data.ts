import { PricingOption } from '../../model/pricing/pricing.model';
import { PricingFeature } from '../../model/product/product.model';

export const PremiumProducts = {
  premiumAccount: '0276d8d1-0945-412b-92d1-084a6e3f7554'
};

export const premiumAccountPricingOptions: PricingOption[ ] = [
  {
    title: `Premium`,
    description: `Full access to premium features`,
    features: [ [ 'true' ] ],
    price: {
      currency: '$',
      value: '19.99',
      subscriptionTime: '',
    },
  }
];

export const premiumAccountPricingFeatures: PricingFeature[ ] = [ {
  name: 'Full Access',
  details: [ { name: 'Full access to premium features', description: 'Full access to premium features' } ]
} ];

