export const getTotalItemsCount = (arr) => {
  if (!arr || arr.length === 0) {
    return 0;
  }

  return arr.reduce((sum, item) => (sum += parseInt(item.count)), 0);
};
