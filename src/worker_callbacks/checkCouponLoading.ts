import checkCouponLoadingGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/checkCouponLoading';
import {
  log,
  getElement,
  awaiter,
  getRemainingTimeout,
  checkCouponLoadingError,
  checkCouponLoadingSuccess,
  text,
  sleep,
} from '@kot-shrodingera-team/germes-utils';
import { StateMachine } from '@kot-shrodingera-team/germes-utils/stateMachine';

const loaderSelector = '.basket-make-bet-button.wait';
const errorSelector = '.basket-item-error';
// const betPlacedSelector = '.basket-item-result';
const betPlacedSelector = '.basket-item-result, .basket-dobet-success';

const asyncCheck = async () => {
  const machine = new StateMachine();

  machine.promises = {
    loader: () => getElement(loaderSelector, getRemainingTimeout()),
    error: () => getElement(errorSelector, getRemainingTimeout()),
    betPlaced: () => getElement(betPlacedSelector, getRemainingTimeout()),
  };

  machine.setStates({
    start: {
      entry: async () => {
        log('Начало обработки ставки', 'steelblue');
      },
    },
    loader: {
      entry: async () => {
        log('Появился индикатор', 'steelblue');
        window.germesData.betProcessingAdditionalInfo = 'индикатор';
        delete machine.promises.loader;
        machine.promises.loaderDissappeared = () =>
          awaiter(
            () => document.querySelector(loaderSelector) === null,
            getRemainingTimeout()
          );
      },
    },
    loaderDissappeared: {
      entry: async () => {
        log('Исчез индикатор', 'steelblue');
        window.germesData.betProcessingAdditionalInfo = null;
        delete machine.promises.loaderDissappeared;
      },
    },
    error: {
      entry: async () => {
        log('Появилась ошибка', 'steelblue');
        window.germesData.betProcessingAdditionalInfo = null;
        const errorText = text(machine.data.result as HTMLElement);
        log(errorText, 'tomato');
        // if (/изменились коэффициенты/.test(errorText)) {
        //   log('изменились коэффициенты', 'crimson');
        // } else {
        worker.Helper.SendInformedMessage(errorText);
        //   sendTGBotMessage(
        //     '1786981726:AAE35XkwJRsuReonfh1X2b8E7k9X4vknC_s',
        //     126302051,
        //     errorText
        //   );
        // }
        checkCouponLoadingError({});
        machine.end = true;
      },
    },
    betPlaced: {
      entry: async () => {
        window.germesData.betProcessingAdditionalInfo = null;
        machine.promises = {
          updateCoefficient: () => sleep(0),
        };
        log('Ставка принята', 'steelblue'); // log
      },
    },
    updateCoefficient: {
      entry: async () => {
        window.germesData.betProcessingAdditionalInfo = null;
        const getNewCoef = async () => {
          const betslipButtons = await getElement('.basket-bets-count-item');
          if (betslipButtons) {
            const betHistoryButton = document.querySelectorAll<HTMLElement>(
              '.basket-bets-count-item'
            )[1];
            betHistoryButton.click();
          }
          const newCoefElem = await getElement(
            '.basket-bets-item-game-cont-cf',
            10000
          );
          // const newCoefElem = document.querySelector('.basket-bets-item-game-cont-cf');
          return Number(newCoefElem.textContent.replace(',', '.'));
        };
        log('Обновление итогового коэффициента', 'steelblue');
        const resultCoefficient = await getNewCoef();
        if (resultCoefficient !== worker.StakeInfo.Coef) {
          log(
            `Коэффициент изменился: ${worker.StakeInfo.Coef} => ${resultCoefficient}`,
            'orange'
          );
          worker.StakeInfo.Coef = resultCoefficient;
        } else {
          log('Коэффициент не изменился', 'lightblue');
        }
        checkCouponLoadingSuccess();
        machine.end = true;
      },
    },
    timeout: {
      entry: async () => {
        window.germesData.betProcessingAdditionalInfo = null;
        checkCouponLoadingError({
          botMessage: 'Не дождались результата ставки',
          informMessage: 'Не дождались результата ставки',
        });
        machine.end = true;
      },
    },
  });

  machine.start('start');
};

const checkCouponLoading = checkCouponLoadingGenerator({
  asyncCheck,
});

export default checkCouponLoading;
