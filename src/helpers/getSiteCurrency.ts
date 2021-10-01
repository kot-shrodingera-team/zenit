const getSiteCurrency = (): string => {
  if (worker.IsRu) {
    return 'RUR';
  }
  return 'Unknown';
};

export default getSiteCurrency;
