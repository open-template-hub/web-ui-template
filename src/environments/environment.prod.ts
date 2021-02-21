export const environment = {
  production: true,

  serverUrl: 'https://oth-orchestration.herokuapp.com',

  oth: {
    social: {
      linkedin: 'open-template-hub',
      github: 'open-template-hub',
      productHunt: '@open_template_hub',
      twitter: 'opentemplatehub'
    }
  },

  social: {
    twitter: {
      tag: 'TWITTER',
      callbackParams: [ 'oauth_token', 'oauth_verifier' ],
      logo: './assets/social/twitter-logo.png',
      cssClass: 'twitter'
    },
    google: {
      tag: 'GOOGLE',
      callbackParams: [ 'code', 'state' ],
      logo: './assets/social/google-logo.png',
      cssClass: 'google'
    },
    facebook: {
      tag: 'FACEBOOK',
      callbackParams: [ 'code' ],
      logo: './assets/social/facebook-logo.png',
      cssClass: 'facebook-f'
    },
    linkedin: {
      tag: 'LINKEDIN',
      callbackParams: [ 'code', 'state' ],
      logo: './assets/social/linkedin-logo.png',
      cssClass: 'linkedin-in'
    },
    twitch: {
      tag: 'TWITCH',
      callbackParams: [ 'code', 'state' ],
      logo: './assets/social/twitch-logo.png',
      cssClass: 'twitch'
    },
    dribbble: {
      tag: 'DRIBBBLE',
      callbackParams: [ 'code', 'state' ],
      logo: './assets/social/dribbble-logo.png',
      cssClass: 'dribbble'
    },
    reddit: {
      tag: 'REDDIT',
      callbackParams: [ 'code', 'state' ],
      logo: './assets/social/reddit-logo.png',
      cssClass: 'reddit-alien'
    },
    github: {
      tag: 'GITHUB',
      callbackParams: [ 'code', 'state' ],
      logo: './assets/social/github-logo.png',
      cssClass: 'github'
    },
    stripe: {
      cssClass: 'stripe-s'
    },
    coinbase: {
      cssClass: 'coinbase'
    },
    paypal: {
      cssClass: 'paypal'
    },
    productHunt: {
      cssClass: 'product-hunt'
    }
  },

  payment: {
    stripe: {
      tag: 'STRIPE',
      publishableKey: 'pk_test_51I4pFdJslj2vUcp7AkRtYwCPiZJbSvGK7lNFggSbLp9LQopdnUJU44mBKlREonmvszmASnyv4FMxQztzFedllxJO00wg7mHS85'
    },
    coinbase: {
      tag: 'COINBASE'
    },
    paypal: {
      tag: 'PAYPAL',
      cliendId: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
      version: '5.0.128',
      env: 'sandbox'
      // env: 'live'
    }
  }
};
