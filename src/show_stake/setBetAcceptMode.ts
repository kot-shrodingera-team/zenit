import { log } from '@kot-shrodingera-team/germes-utils';

const setBetAcceptMode = async (): Promise<void> => {
  const switcher = document.querySelector<HTMLSelectElement>(
    '.basket-agree-cf__select'
  );
  // Если выбран режим только с исходным коэффициентом
  if (worker.StakeAcceptRuleShoulder === 0) {
    if (switcher.value === '0') {
      log(
        'Уже выбран режим принятия ставки с исходным коэффициентом',
        'steelblue'
      );
    } else {
      log('Выбираем режим принятия ставки с исходным коэффициентом', 'orange');
      switcher.value = '0';
    }
  }
  // Если выбран режим с повышением коэффициента
  if (worker.StakeAcceptRuleShoulder === 1) {
    if (switcher.value === '2') {
      log(
        'Уже выбран режим принятия ставки с повышенным коэффициентом',
        'steelblue'
      );
    } else {
      log(
        'Выбираем режим принятия ставки с повышенным коэффициентом',
        'orange'
      );
      switcher.value = '2';
    }
  }

  // Если выбран режим с любым коэффициентом
  if (worker.StakeAcceptRuleShoulder === 2) {
    if (switcher.value === '1') {
      log(
        'Уже выбран режим принятия ставки с любым коэффициентом',
        'steelblue'
      );
    } else {
      log('Выбираем режим принятия ставки с любым коэффициентом', 'orange');
      switcher.value = '1';
    }
  }
};

export default setBetAcceptMode;
