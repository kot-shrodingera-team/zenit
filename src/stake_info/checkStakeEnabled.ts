import checkStakeEnabledGenerator from '@kot-shrodingera-team/germes-generators/stake_info/checkStakeEnabled';
import getStakeCount from './getStakeCount';

const preCheck = (): boolean => {
  return true;
};

const checkStakeEnabled = checkStakeEnabledGenerator({
  preCheck,
  getStakeCount,
  betCheck: {
    selector: '.basket-item',
    errorClasses: [
      {
        className: '',
        message: '',
      },
    ],
  },
  errorsCheck: [
    {
      selector: '.basket-item-error',
      message: '',
    },
    {
      selector: '.basket-error-red-info-text-new',
      message: '',
    },
  ],
  context: () => document,
});

export default checkStakeEnabled;
