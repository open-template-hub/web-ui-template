export const environment = {
  production: true,

  authServerUrl: 'https://auth-server-nodejs-template-st.herokuapp.com',

  social: {
    twitter: {
      tag: 'TWITTER',
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
      tag: 'LINKEDIN',
      callbackParams: ['code', 'state'],
      logo: './assets/social/linkedin-logo.png',
      cssClass: 'linkedin-in'
    },
    twitch: {
      tag: 'TWITCH',
      callbackParams: ['code'],
      logo: './assets/social/twitch-logo.png',
      cssClass: 'twitch'
    },
    dribbble: {
      tag: 'DRIBBBLE',
      callbackParams: ['code', 'state'],
      logo: './assets/social/dribbble-logo.png',
      cssClass: 'dribbble'
    },
    reddit: {
      tag: 'REDDIT',
      callbackParams: ['code', 'state'],
      logo: './assets/social/reddit-logo.png',
      cssClass: 'reddit-alien'
    },
    github: {
      tag: 'GITHUB',
      callbackParams: ['code', 'state'],
      logo: './assets/social/github-logo.png',
      cssClass: 'github'
    },
  }
};
