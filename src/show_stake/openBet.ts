import {
  fireEvent,
  log,
  repeatingOpenBet,
  text,
} from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import findButton from '../helpers/findButton';
import getStakeCount from '../stake_info/getStakeCount';
import clearCoupon from './clearCoupon';

const openBet = async (): Promise<void> => {
  /* ======================================================================== */
  /*                              Очистка купона                              */
  /* ======================================================================== */

  const couponCleared = await clearCoupon();
  if (!couponCleared) {
    throw new JsFailError('Не удалось очистить купон');
  }

  /* ======================================================================== */
  /*                      Формирование данных для поиска                      */
  /* ======================================================================== */

  const { oId } = JSON.parse(worker.BetId);
  // const betSelector = `[id*="${betId}"]`;
  // log(`betSelector = "${betSelector}"`, 'white', true);

  /* ======================================================================== */
  /*                               Поиск ставки                               */
  /* ======================================================================== */

  const bet = await findButton(oId);
  if (!bet) {
    throw new JsFailError('Ставка не найдена');
  }

  /* ======================================================================== */
  /*           Открытие ставки, проверка, что ставка попала в купон           */
  /* ======================================================================== */

  const openingAction = async () => {
    bet.click();
  };
  await repeatingOpenBet(openingAction, getStakeCount, 5, 1000, 50);

  /* ======================================================================== */
  /*                    Вывод информации об открытой ставке                   */
  /* ======================================================================== */

  const eventNameSelector = '.basket-item-event';
  const marketNameSelector = '.basket-item-name';
  const betNameSelector = '.basket-item-name';

  const eventNameElement = document.querySelector(eventNameSelector);
  const marketNameElement = document.querySelector(marketNameSelector);
  const betNameElement = document.querySelector(betNameSelector);

  if (!eventNameElement) {
    throw new JsFailError('Не найдено событие открытой ставки');
  }
  if (!marketNameElement) {
    throw new JsFailError('Не найден маркет открытой ставки');
  }
  if (!betNameElement) {
    throw new JsFailError('Не найдена роспись открытой ставки');
  }

  const eventName = text(eventNameElement);
  const marketName = text(marketNameElement);
  const betName = text(betNameElement);

  log(`Открыта ставка\n${eventName}\n${marketName}\n${betName}`, 'steelblue');
};

export default openBet;
