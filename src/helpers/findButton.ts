import { fireEvent, getElement, log } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import { getReactInstance } from '@kot-shrodingera-team/germes-utils/reactUtils';

const findButton = async (oId: number): Promise<HTMLElement> => {
  const table = await getElement('table');

  if (!table) {
    throw new JsFailError('Не найдены маркеты');
  }

  const buttonShowAll = await getElement('.g-a-c-cont > .g-a-c-i');
  if (buttonShowAll) {
    log('Отрываем все маркеты', 'cadetblue');
    fireEvent(buttonShowAll, 'click');
  }
  const buttons = [...document.querySelectorAll('table > tbody > tr a.g-b')];

  // log(`Появилось ${buttons.length} кнопок `, 'orange');

  const targetButton = buttons.flat().find((button) => {
    const buttonReactInstance = getReactInstance(
      button
    ) as OddButtonReactInstance;

    if (
      !buttonReactInstance ||
      !buttonReactInstance.return ||
      !buttonReactInstance.return.return ||
      !buttonReactInstance.return.return.pendingProps ||
      !buttonReactInstance.return.return.pendingProps.cell ||
      !buttonReactInstance.return.return.pendingProps.cell.bet
    ) {
      return null;
    }
    return buttonReactInstance.return.return.pendingProps.cell.bet === oId;
  });

  if (targetButton) {
    return targetButton as HTMLElement;
  }

  return null;
};

export default findButton;
