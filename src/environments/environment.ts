// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  authServerUrl: 'http://localhost:4000',

  social: {
    twitter: {
      tag: 'TWITTER_LOCAL',
      callbackParams: ['oauth_token', 'oauth_verifier'],
      logo: './assets/social/twitter-logo.png',
      cssClass: 'twitter'
    },
    facebook: {
      tag: 'FACEBOOK',
      callbackParams: ['code', 'state'],
      logo: './assets/social/facebook-logo.png',
      cssClass: 'facebook-f'
    },
    linkedin: {
      tag: 'LINKEDIN_LOCAL',
      callbackParams: ['code', 'state'],
      logo: './assets/social/linkedin-logo.png',
      cssClass: 'linkedin-in'
    },
    twitch: {
      tag: 'TWITCH_LOCAL',
      callbackParams: ['code'],
      logo: './assets/social/twitch-logo.png',
      cssClass: 'twitch'
    },
    dribbble: {
      tag: 'DRIBBBLE_LOCAL',
      callbackParams: ['code', 'state'],
      logo: './assets/social/dribbble-logo.png',
      cssClass: 'dribbble'
    },
    reddit: {
      tag: 'REDDIT_LOCAL',
      callbackParams: ['code', 'state'],
      logo: './assets/social/reddit-logo.png',
      cssClass: 'reddit-alien'
    },
    github: {
      tag: 'GITHUB_LOCAL',
      callbackParams: ['code', 'state'],
      logo: './assets/social/github-logo.png',
      cssClass: 'github'
    },
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
