import { Helmet } from 'react-helmet';

const CartPageHelmet = () => {
  return (
    <Helmet>
      <title>Cart | React Sneakers</title>
      <meta
        name="description"
        content="Review the items in your cart and proceed to checkout to purchase your favorite sneakers."
      />
    </Helmet>
  );
};

export default CartPageHelmet;
