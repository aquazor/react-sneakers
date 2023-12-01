import { images } from '../../constants/images';

const SneakerCard = ({ card }) => {
  return (
    <div className="sneakers__content-card">
      <img src={card.url} width={133} height={112} alt="Sneakers" />

      <h5>{card.description}</h5>

      <div className="sneakers__content-card_price">
        <div className="sneakers__content-card_price-left">
          <span>ЦЕНА: </span>
          <b>{card.price} руб.</b>
        </div>

        <button type="button">
          <img src={images.plusButton} width={32} height={32} alt="Plus" />
        </button>
      </div>
    </div>
  );
};

export default SneakerCard;
