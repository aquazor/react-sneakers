import { useState } from 'react';
import { images } from '../../constants/images';
import Button from '../Button/Button';

const SneakerCard = ({ card }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="sneakers__content-card">
      <img src={card.url} width={133} height={112} alt="Sneakers" />

      <h5>{card.description}</h5>

      <div className="sneakers__content-card_price">
        <div className="sneakers__content-card_price-left">
          <span>ЦЕНА: </span>
          <b>{card.price} руб.</b>
        </div>

        <Button
          className="sneakers__content-card_price-button flex__center "
          onClick={() => setIsAdded((current) => !current)}
        >
          <img
            src={isAdded ? images.plusButtonActive : images.plusButton}
            width={32}
            height={32}
            alt="To Cart"
          />
        </Button>
      </div>

      <Button
        className="sneakers__content-card_button flex__center"
        onClick={() => setIsLiked((current) => !current)}
      >
        <img
          src={isLiked ? images.favoriteButtonActive : images.favoriteButton}
          width={32}
          height={32}
          alt="Like"
        />
      </Button>
    </div>
  );
};

export default SneakerCard;
