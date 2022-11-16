import { EnvironmentModel } from '../app/model/environment/environment.model';
import { defaultEnvironmentConfigurations } from './environment-init';

export const environment: EnvironmentModel = {
  identity: 'local',

  production: false,

  serverUrl: 'http://localhost:4000',

  clientUrl: 'http://localhost:4201',

  oauth: {
    twitter: {
      tag: 'TWITTER_WEB_LOCAL'
    },
    google: {
      tag: 'GOOGLE_WEB_LOCAL'
    },
    facebook: {
      // Facebook does not allow testing social login at localhost.
      tag: ''
    },
    linkedin: {
      tag: 'LINKEDIN_WEB_LOCAL'
    },
    twitch: {
      tag: 'TWITCH_WEB_LOCAL'
    },
    github: {
      tag: 'GITHUB_WEB_LOCAL'
    },
    dribbble: {
      tag: 'DRIBBBLE_WEB_LOCAL'
    },
    reddit: {
      tag: 'REDDIT_WEB_LOCAL'
    }
  },

  payment: {
    stripe: {
      tag: 'STRIPE_WEB_LOCAL',
      publishableKey: 'pk_test_51I4pFdJslj2vUcp7AkRtYwCPiZJbSvGK7lNFggSbLp9LQopdnUJU44mBKlREonmvszmASnyv4FMxQztzFedllxJO00wg7mHS85',
    },
    coinbase: {
      tag: 'COINBASE_WEB_LOCAL'
    },
    paypal: {
      tag: 'PAYPAL_WEB_LOCAL',
      clientId: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
      env: 'sandbox'
    }
  },

  fileStorage: defaultEnvironmentConfigurations.fileStorage,

  mail: defaultEnvironmentConfigurations.mail,

  sms: defaultEnvironmentConfigurations.sms,

  analytics: defaultEnvironmentConfigurations.analytics
};
