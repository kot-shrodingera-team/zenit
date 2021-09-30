const getSiteCurrency = (): string => {
  let currency = 'Unknow';
  if (worker.IsRu === true) currency = 'RUR';
  return currency;
};

export default getSiteCurrency;
