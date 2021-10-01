import clearCouponGenerator from '@kot-shrodingera-team/germes-generators/show_stake/clearCoupon';
import getStakeCount from '../stake_info/getStakeCount';

// const preCheck = async (): Promise<boolean> => {
//   return true;
// };

// const apiClear = (): void => {
//   const clearButton = document.querySelector<HTMLElement>(
//     '.basket-bets-icon-delete'
//   );
//   clearButton.click();
// };

// const postCheck = async (): Promise<boolean> => {
//   return true;
// };

const clearCoupon = clearCouponGenerator({
  // preCheck,
  getStakeCount,
  // apiClear,
  // clearSingleSelector: '.basket-item-remove',
  clearAllSelector: '.basket-bets-icon-delete',
  // postCheck,
  // context: () => document,
});

export default clearCoupon;
