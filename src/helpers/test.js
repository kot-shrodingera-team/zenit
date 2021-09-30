const getReactInstance = (element) => {
  if (element) {
    return element[
      Object.keys(element).find((key) =>
        key.startsWith('__reactInternalInstance')
      )
    ];
  }
  return null;
};
