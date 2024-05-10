export const getTotalItemsPrice = (arr) => {
  if (!arr || arr.length === 0) {
    return 0;
  }

  return arr.reduce((sum, item) => (sum += parseInt(item.price * item.count)), 0);
};
