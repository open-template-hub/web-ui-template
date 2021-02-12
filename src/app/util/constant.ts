/**
 * @description holds constants
 */

export const ResponseCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INVALID_TOKEN: 498,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
}

export const PROFILE_IMG = './assets/common/profile-img.png';

const dashboard = '/dashboard';
const settings = '/settings';
const user = '/user';
const callback = '/callback';

export const URLS = {
  root: '/',
  u: '/u',
  notFound: '/not-found',
  maintenance: '/maintenance',
  signup: '/signup',
  signupSuccess: '/signup-success',
  verifyAccount: '/verify-account',
  login: '/login',
  forgetPassword: '/forget-password',
  resetPassword: '/reset-password',
  cookiePolicy: '/cookie-policy',
  privacyPolicy: '/privacy-policy',
  terms: '/terms',
  dashboard: {
    root: dashboard,
    contribute: dashboard + '/contribute',
    learn: dashboard + '/learn',
    privacy: dashboard + '/privacy',
  },
  settings: {
    welcome: settings + '/welcome',
    editProfile: settings + '/edit-profile',
  },
  user: {
    root: user
  },
  callback: {
    root: callback,
    twitter: callback + '/twitter',
    google: callback + '/google',
    facebook: callback + '/facebook',
    linkedin: callback + '/linkedin',
    github: callback + '/github'
  }
}
