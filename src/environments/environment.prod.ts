import { EnvironmentModel } from '../app/model/environment/environment.model';
import { defaultEnvironmentConfigurations } from './environment-init';

export const environment: EnvironmentModel = {
  identity: 'production',

  production: true,

  // serverUrl: 'https://oth-server-orchestra-live.herokuapp.com',
  serverUrl: 'https://oth-server-orchestra-dev.herokuapp.com',

  clientUrl: 'https://web.opentemplatehub.com',

  oauth: {
    twitter: {
      tag: 'TWITTER_WEB'
    },
    google: {
      tag: 'GOOGLE_WEB'
    },
    facebook: {
      tag: 'FACEBOOK_WEB'
    },
    linkedin: {
      tag: 'LINKEDIN_WEB'
    },
    twitch: {
      tag: 'TWITCH_WEB'
    },
    github: {
      tag: 'GITHUB_WEB'
    },
    dribbble: {
      tag: 'DRIBBBLE_WEB'
    },
    reddit: {
      tag: 'REDDIT_WEB'
    }
  },

  payment: {
    stripe: {
      tag: 'STRIPE_WEB',
      publishableKey: 'pk_test_51I4pFdJslj2vUcp7AkRtYwCPiZJbSvGK7lNFggSbLp9LQopdnUJU44mBKlREonmvszmASnyv4FMxQztzFedllxJO00wg7mHS85',
    },
    coinbase: {
      tag: 'COINBASE_WEB'
    },
    paypal: {
      tag: 'PAYPAL_WEB',
      clientId: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
      env: 'live'
    }
  },

  fileStorage: defaultEnvironmentConfigurations.fileStorage,

  mail: defaultEnvironmentConfigurations.mail,

  sms: defaultEnvironmentConfigurations.sms,

  analytics: {
    googleAnalytics: {
      tag: 'GTM-NNRF845',
      id: ''
    },
    matomo: {
      tag: 'https://opentemplatehub.matomo.cloud',
      id: '2'
    },
    mixPanel: {
      tag: '7d4ffb5eb94ac6b29491cc8ddb55dadb',
      id: ''
    }
  }
};
