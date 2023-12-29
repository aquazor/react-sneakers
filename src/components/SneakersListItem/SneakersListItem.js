import './SneakersListItem.scss';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useCartContext, useFavoriteContext } from '../../context';
import { images } from '../../constants/images';
import { CART, FAVORITE } from '../../constants/constants';
import Button from '../Button/Button';

const SneakersListItem = memo(({ item }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFavorite, setIsAddedToFavorite] = useState(false);

  const { cartItems, addCartItem, removeCartItem, isLoadingCartItem } = useCartContext();
  const { favoriteItems, addFavoriteItem, removeFavoriteItem, isLoadingFavoriteItem } =
    useFavoriteContext();

  const alreadyInFavorites = useMemo(
    () => favoriteItems?.some((obj) => item.id === obj.id),
    [favoriteItems, item.id]
  );
  const alreadyInCart = useMemo(
    () => cartItems?.some((obj) => item.id === obj.id),
    [cartItems, item.id]
  );

  useEffect(() => {
    setIsAddedToCart(alreadyInCart);
    setIsAddedToFavorite(alreadyInFavorites);
  }, [alreadyInCart, alreadyInFavorites]);

  const handleAdd = useCallback(
    (to, obj) => {
      switch (to) {
        case CART:
          if (alreadyInCart) {
            removeCartItem(obj);
            return;
          }

          addCartItem(obj);
          break;

        case FAVORITE:
          if (alreadyInFavorites) {
            removeFavoriteItem(obj);
            return;
          }

          addFavoriteItem(obj);
          break;

        default:
          throw new Error('u kek');
      }
    },
    [
      addCartItem,
      addFavoriteItem,
      alreadyInCart,
      alreadyInFavorites,
      removeCartItem,
      removeFavoriteItem,
    ]
  );

  return (
    <li className="sneakers__card">
      <img src={item.url} width={133} height={112} alt="Sneakers" />

      <h5>{item.description}</h5>

      <div className="sneakers__card-price">
        <div className="sneakers__card-price_left">
          <span>ЦЕНА: </span>
          <b>{item.price.toLocaleString('ru-RU')} ₸</b>
        </div>

        <Button
          className="sneakers__card-price_button flex__center"
          loading={isLoadingCartItem[item.id]}
          onClick={() => handleAdd(CART, item)}
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
        loading={isLoadingFavoriteItem[item.id]}
        onClick={() => handleAdd(FAVORITE, item)}
      >
        <img
          src={isAddedToFavorite ? images.favoriteButtonActive : images.favoriteButton}
          width={32}
          height={32}
          alt="Like"
        />
      </Button>
    </li>
  );
});

export default SneakersListItem;
