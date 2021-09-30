import checkAuthGenerator, {
  authStateReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/checkAuth';

export const noAuthElementSelector = '.header-login-btn';
export const authElementSelector = '.header-account-menu__balance';

export const authStateReady = authStateReadyGenerator({
  noAuthElementSelector,
  authElementSelector,
  maxDelayAfterNoAuthElementAppeared: 0,
  context: () => document,
});

const checkAuth = checkAuthGenerator({
  authElementSelector,
  context: () => document,
});

export default checkAuth;
