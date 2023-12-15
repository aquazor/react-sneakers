import './SneakersCard.scss';
import { useEffect, useState } from 'react';
import { images } from '../../constants/images';
import { useCartContext, useFavoritesContext } from '../../context';
import Button from '../Button/Button';

const SneakerCard = ({ item }) => {
  const { cart, addToCart, removeFromCart } = useCartContext();
  const { favorites, addToFavorites, removeFromFavorites } = useFavoritesContext();

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);

  const alreadyInCart = cart?.some((el) => el.id === item.id);
  const alreadyInFavorites = favorites?.some((el) => el.id === item.id);

  useEffect(() => {
    const result = {
      inCart: alreadyInCart && true,
      inFavorites: alreadyInFavorites && true,
    };

    setIsAddedToFavorites(result.inFavorites);
    setIsAddedToCart(result.inCart);
  }, [alreadyInCart, alreadyInFavorites]);

  const handleAddToCart = (obj) => {
    if (alreadyInCart) {
      removeFromCart(obj.id);
      return;
    }

    addToCart(obj);
  };

  const handleAddToFavorites = (obj) => {
    if (alreadyInFavorites) {
      removeFromFavorites(obj.id);
      return;
    }

    addToFavorites(obj);
    setIsAddedToFavorites();
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
        onClick={() => handleAddToFavorites(item)}
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
