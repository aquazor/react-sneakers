import './SneakersCard.scss';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../context/cart';
import { images } from '../../constants/images';
import Button from '../Button/Button';

const SneakerCard = ({ item }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFavorite, setIsAddedToFavorite] = useState(false);

  const alreadyInCart = cart.some((el) => el.id === item.id);

  useEffect(() => {
    if (alreadyInCart) {
      setIsAddedToCart(true);
    } else {
      setIsAddedToCart(false);
    }
  }, [alreadyInCart]);

  const handleAddToCart = (obj) => {
    if (alreadyInCart) {
      removeFromCart(obj.id);
      return;
    }

    addToCart(obj);
  };

  return (
    <div className="sneakers__content-card">
      <img src={item.url} width={133} height={112} alt="Sneakers" />

      <h5>{item.description}</h5>

      <div className="sneakers__content-card_price">
        <div className="sneakers__content-card_price-left">
          <span>ЦЕНА: </span>
          <b>{item.price} руб.</b>
        </div>

        <Button
          className="sneakers__content-card_price-button flex__center "
          onClick={() => handleAddToCart(item)}
        >
          <img
            src={isAddedToCart ? images.plusButtonActive : images.plusButton}
            width={32}
            height={32}
            alt="To Cart"
          />
        </Button>
      </div>

      <Button
        className="sneakers__content-card_button flex__center"
        onClick={() => setIsAddedToFavorite((current) => !current)}
      >
        <img
          src={isAddedToFavorite ? images.favoriteButtonActive : images.favoriteButton}
          width={32}
          height={32}
          alt="Like"
        />
      </Button>
    </div>
  );
};

export default SneakerCard;
