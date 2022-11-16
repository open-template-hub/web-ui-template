import { EnvironmentModel } from '../app/model/environment/environment.model';
import { defaultEnvironmentConfigurations } from './environment-init';

export const environment: EnvironmentModel = {
  identity: 'staging',

  production: false,

  serverUrl: 'https://oth-server-orchestra-dev.herokuapp.com',

  clientUrl: 'https://oth-ui-web-dev.herokuapp.com',

  oauth: {
    twitter: {
      tag: 'TWITTER_WEB_DEVELOPMENT'
    },
    google: {
      tag: 'GOOGLE_WEB_DEVELOPMENT'
    },
    facebook: {
      tag: 'FACEBOOK_WEB_DEVELOPMENT'
    },
    linkedin: {
      tag: 'LINKEDIN_WEB_DEVELOPMENT'
    },
    twitch: {
      tag: 'TWITCH_WEB_DEVELOPMENT'
    },
    github: {
      tag: 'GITHUB_WEB_DEVELOPMENT'
    },
    dribbble: {
      tag: 'DRIBBBLE_WEB_DEVELOPMENT'
    },
    reddit: {
      tag: 'REDDIT_WEB_DEVELOPMENT'
    }
  },

  payment: {
    stripe: {
      tag: 'STRIPE_WEB_DEVELOPMENT',
      publishableKey: 'pk_test_51I4pFdJslj2vUcp7AkRtYwCPiZJbSvGK7lNFggSbLp9LQopdnUJU44mBKlREonmvszmASnyv4FMxQztzFedllxJO00wg7mHS85',
    },
    coinbase: {
      tag: 'COINBASE_WEB_DEVELOPMENT'
    },
    paypal: {
      tag: 'PAYPAL_WEB_DEVELOPMENT',
      clientId: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
      env: 'sandbox'
    }
  },

  fileStorage: defaultEnvironmentConfigurations.fileStorage,

  mail: defaultEnvironmentConfigurations.mail,

  sms: defaultEnvironmentConfigurations.sms,

  analytics: defaultEnvironmentConfigurations.analytics
};
