import getStakeInfoValueGenerator, {
  stakeInfoValueReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getStakeInfoValue';
import { StakeInfoValueOptions } from '@kot-shrodingera-team/germes-generators/stake_info/types';

export const getNewValue = async <E extends Element = Element>(
  selector: string,
  rejectTime = 5000,
  context: Document | Element = document
): Promise<E> => {
  const fixValue = (elem: Element) => {
    const balanceValue = elem.textContent.replace(',', '.');
    const parameterBalanceRegex = /\d+.\d+/;
    const balanceNum = Number(balanceValue.match(parameterBalanceRegex));
    return balanceNum;
  };

  return new Promise((resolve /* , reject */) => {
    let element = context.querySelector<E>(selector);
    if (fixValue(element) !== 0) {
      resolve(element);
      return;
    }
    const observerConfig = {
      childList: true,
      subtree: true,
      characterData: true,
    };

    const mutationObserver = new MutationObserver((mutations, observer) => {
      element = context.querySelector<E>(selector);
      if (element) {
        resolve(element);
        observer.disconnect();
      }
    });

    if (rejectTime > 0) {
      setTimeout(() => {
        if (fixValue(element) === 0) {
          resolve(element);
          mutationObserver.disconnect();
        }
      }, rejectTime);
    }

    mutationObserver.observe(element, observerConfig);
  });
};

export const balanceSelector = '.header-account-menu__balance';

const balanceOptions: StakeInfoValueOptions = {
  name: 'balance',
  // fixedValue: () => 0,
  valueFromText: {
    text: {
      // getText: () => '',
      selector: balanceSelector,
      context: () => document,
    },
    replaceDataArray: [
      {
        searchValue: ',',
        replaceValue: '.',
      },
    ],
    removeRegex: /[\s,']/g,
    matchRegex: /(\d+(?:\.\d+)?)/,
    errorValue: 0,
  },
  zeroValues: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  modifyValue: (value: number, extractType: string) => value,
  disableLog: false,
};

const getBalance = getStakeInfoValueGenerator(balanceOptions);

export const balanceReady = stakeInfoValueReadyGenerator(balanceOptions);

export const updateBalance = async (): Promise<void> => {
  await getNewValue(balanceSelector);
  worker.StakeInfo.Balance = getBalance();
  worker.JSBalanceChange(getBalance());
};

export default getBalance;
