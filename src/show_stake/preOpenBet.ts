import { getElement } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';

const preOpenBet = async (): Promise<void> => {
  const divmain = await getElement('.divmain', 10000);

  if (!divmain) {
    throw new JsFailError('Не дождались загрузки страницы');
  }
};

export default preOpenBet;
