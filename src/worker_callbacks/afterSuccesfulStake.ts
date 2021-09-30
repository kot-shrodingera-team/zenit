// import getStakeInfoValueGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getStakeInfoValue';
// import { StakeInfoValueOptions } from '@kot-shrodingera-team/germes-generators/stake_info/types';
import {
  getElement,
  getWorkerParameter,
  log,
} from '@kot-shrodingera-team/germes-utils';
import getCoefficient from '../stake_info/getCoefficient';

// const getResultCoefficientText = (): string => {
//   return null;
// };

// export const resultCoefficientSelector = '';

// const resultCoefficientOptions: StakeInfoValueOptions = {
//   name: 'coefficient',
//   // fixedValue: () => 0,
//   valueFromText: {
//     text: {
//       // getText: getResultCoefficientText,
//       selector: resultCoefficientSelector,
//       context: () => document,
//     },
//     replaceDataArray: [
//       {
//         searchValue: '',
//         replaceValue: '',
//       },
//     ],
//     removeRegex: /[\s,']/g,
//     matchRegex: /(\d+(?:\.\d+)?)/,
//     errorValue: 0,
//   },
//   zeroValues: [],
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   modifyValue: (value: number, extractType: string) => value,
//   disableLog: false,
// };

// const getResultCoefficient = getStakeInfoValueGenerator(
//   resultCoefficientOptions
// );

const getNewCoef = async () => {
  const betslipButtons = await getElement('.basket-bets-count-item');
  if (betslipButtons) {
    const betHistoryButton = document.querySelectorAll<HTMLElement>(
      '.basket-bets-count-item'
    )[1];
    betHistoryButton.click();
  }
  const newCoefElem = await getElement('.basket-bets-item-game-cont-cf', 10000);
  // const newCoefElem = document.querySelector('.basket-bets-item-game-cont-cf');
  return Number(newCoefElem.textContent.replace(',', '.'));
};
// const getResultCoefficient = getCoefficient;
// const getResultCoefficient = getCoefficient;

const afterSuccesfulStake = async (): Promise<void> => {
  if (getWorkerParameter('fakeDoStake')) {
    return;
  }
  log('Обновление итогового коэффициента', 'steelblue');
  const resultCoefficient = await getNewCoef();
  if (resultCoefficient !== worker.StakeInfo.Coef) {
    log(
      `Коеффициент изменился: ${worker.StakeInfo.Coef} => ${resultCoefficient}`,
      'orange'
    );
    worker.StakeInfo.Coef = resultCoefficient;
    return;
  }
  log('Коеффициент не изменился', 'lightblue');
};

export default afterSuccesfulStake;
