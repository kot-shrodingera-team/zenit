import getStakeCountGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getStakeCount';

const getStakeCount = getStakeCountGenerator({
  stakeSelector: '.basket-item',
  // context: () => document,
});

export default getStakeCount;
