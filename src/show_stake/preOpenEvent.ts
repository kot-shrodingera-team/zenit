import {
  awaiter,
  checkBookerHost,
  checkCurrency,
  getElement,
  log,
  sleep,
} from '@kot-shrodingera-team/germes-utils';
import {
  NewUrlError,
  JsFailError,
} from '@kot-shrodingera-team/germes-utils/errors';
import getSiteCurrency from '../helpers/getSiteCurrency';
import checkAuth, { authStateReady } from '../stake_info/checkAuth';
import { balanceReady, updateBalance } from '../stake_info/getBalance';
import clearCoupon from './clearCoupon';

const preOpenEvent = async (): Promise<void> => {
  /* ======================================================================== */
  /*                     Проверка адреса открытой страницы                    */
  /* ======================================================================== */

  if (!checkBookerHost()) {
    log('Открыта не страница конторы (или зеркала)', 'crimson');
    log(`${window.location.href} !== ${worker.BookmakerMainUrl}`, 'crimson');
    window.location.href = new URL(worker.BookmakerMainUrl).href;
    throw new NewUrlError('Открываем страницу БК');
  }

  /* ======================================================================== */
  /*                 Проверка авторизации и обновление баланса                */
  /* ======================================================================== */

  await authStateReady();
  worker.Islogin = checkAuth();
  worker.JSLogined();
  if (!worker.Islogin) {
    throw new JsFailError('Нет авторизации');
  }
  log('Есть авторизация', 'steelblue');
  // updateBalance();
  const balanceElem = await getElement('.header-account-menu__balance');
  const balanceCount = balanceElem.textContent.replace(',', '.');
  const parameterBalanceRegex = /\d+.\d+/;
  const balanceNum = Number(balanceCount.match(parameterBalanceRegex));
  await awaiter(() => updateBalance(), 500, 100, balanceNum !== 0.0);

  /* ======================================================================== */
  /*                              Проверка валюты                             */
  /* ======================================================================== */

  const siteCurrency = getSiteCurrency();
  checkCurrency(siteCurrency);

  await clearCoupon();
};

export default preOpenEvent;
