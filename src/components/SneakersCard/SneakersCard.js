import './SneakersCard.scss';
import { useEffect, useState } from 'react';
import { images } from '../../constants/images';
import { useCartContext, useFavoritesContext } from '../../context';

import Button from '../Button/Button';

const constants = {
  cart: 'cart',
  favorites: 'favorites',
};

const SneakerCard = ({ item }) => {
  const {
    items: cart,
    addItem: addToCart,
    removeItem: removeFromCart,
  } = useCartContext();

  const {
    items: favorites,
    addItem: addToFavorites,
    removeItem: removeFromFavorites,
  } = useFavoritesContext();

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);

  const alreadyInCart = cart?.some((el) => el.id === item.id);
  const alreadyInFavorites = favorites?.some((el) => el.id === item.id);

  useEffect(() => {
    setIsAddedToCart(alreadyInCart && true);
    setIsAddedToFavorites(alreadyInFavorites && true);
  }, [alreadyInCart, alreadyInFavorites]);

  const handleAdd = (to, obj) => {
    switch (to) {
      case constants.cart:
        if (alreadyInCart) {
          removeFromCart(obj.id);
          return;
        }
        addToCart(obj);
        break;
      case constants.favorites:
        if (alreadyInFavorites) {
          removeFromFavorites(obj.id);
          return;
        }

        addToFavorites(obj);
        break;
      default:
        throw new Error('u kek');
    }
  };

  return (
    <div className="sneakers__card">
      <img src={item.url} width={133} height={112} alt="Sneakers" />

      <h5>{item.description}</h5>

      <div className="sneakers__card-price">
        <div className="sneakers__card-price_left">
          <span>ЦЕНА: </span>
          <b>{item.price} ₸</b>
        </div>

        <Button
          className="sneakers__card-price_button flex__center "
          onClick={() => handleAdd(constants.cart, item)}
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
        className="sneakers__card-button flex__center"
        onClick={() => handleAdd(constants.favorites, item)}
      >
        <img
          src={isAddedToFavorites ? images.favoriteButtonActive : images.favoriteButton}
          width={32}
          height={32}
          alt="Like"
        />
      </Button>
    </div>
  );
};

export default SneakerCard;
