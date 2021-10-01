import {
  getWorkerParameter,
  log,
  text,
} from '@kot-shrodingera-team/germes-utils';

const getParameter = (): number => {
  if (
    getWorkerParameter('fakeParameter') ||
    getWorkerParameter('fakeOpenStake')
  ) {
    const parameter = Number(JSON.parse(worker.ForkObj).param);
    if (Number.isNaN(parameter)) {
      return -6666;
    }
    return parameter;
  }

  // const marketNameSelector = '';
  const betNameSelector = '.basket-item-name';

  // const marketNameElement = document.querySelector(marketNameSelector);
  const betNameElement = document.querySelector(betNameSelector);

  // if (!marketNameElement) {
  //   log('Не найден маркет ставки', 'crimson');
  //   return -9999;
  // }
  if (!betNameElement) {
    log('Не найдена роспись ставки', 'crimson');
    return -9999;
  }

  // const marketName = text(marketNameElement);
  const betName = text(betNameElement);

  // if (marketName === 'Draw No Bet') {
  //   return 0;
  // }

  // const parameterRegex = /([+-]?\d+(?:\.\d+)?)/;
  const parameterRegex = /\(([+-]?\d+(?:\.\d+)?)\)/;
  const parameterMatch = betName.match(parameterRegex);
  if (parameterMatch) {
    return Number(parameterMatch[1]);
  }
  return -6666;
};

export default getParameter;
