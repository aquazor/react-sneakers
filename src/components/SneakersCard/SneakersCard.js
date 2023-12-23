import './SneakersCard.scss';
import { memo, useCallback, useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useCartContext, useFavoriteContext } from '../../context';
import { images } from '../../constants/images';
import { CART, FAVORITES } from '../../constants/constants';
import Button from '../Button/Button';

const SneakerCard = memo(({ item, isLoading, alreadyInCart, alreadyInFavorites }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);

  const { addCartItem, removeCartItem, isLoadingCartItem } = useCartContext();
  const { addFavoriteItem, removeFavoriteItem, isLoadingFavoriteItem } =
    useFavoriteContext();

  useEffect(() => {
    setIsAddedToCart(alreadyInCart && true);
    setIsAddedToFavorites(alreadyInFavorites && true);
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

        case FAVORITES:
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
    <div className="sneakers__card">
      {isLoading ? (
        <ContentLoader
          speed={1}
          width={150}
          height={208}
          viewBox="0 0 150 210"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="5" ry="5" width="150" height="100" />
          <rect x="0" y="110" rx="5" ry="5" width="150" height="20" />
          <rect x="0" y="135" rx="5" ry="5" width="100" height="20" />
          <rect x="0" y="176" rx="5" ry="5" width="80" height="30" />
          <rect x="109" y="166" rx="10" ry="10" width="40" height="40" />
        </ContentLoader>
      ) : (
        <>
          <img src={item.url} width={133} height={112} alt="Sneakers" />

          <h5>{item.description}</h5>

          <div className="sneakers__card-price">
            <div className="sneakers__card-price_left">
              <span>ЦЕНА: </span>
              <b>{item.price.toLocaleString('ru-RU')} ₸</b>
            </div>

            <Button
              className="sneakers__card-price_button flex__center"
              disabled={isLoadingCartItem[item.id]}
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
            disabled={isLoadingFavoriteItem[item.id]}
            onClick={() => handleAdd(FAVORITES, item)}
          >
            <img
              src={
                isAddedToFavorites ? images.favoriteButtonActive : images.favoriteButton
              }
              width={32}
              height={32}
              alt="Like"
            />
          </Button>
        </>
      )}
    </div>
  );
});

export default SneakerCard;
