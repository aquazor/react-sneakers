export const getCartFromLocal = () => {
  let cart;

  try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
  } catch (error) {
    cart = [];
  }

  return cart;
};
