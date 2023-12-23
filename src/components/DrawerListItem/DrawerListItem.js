import './DrawerListItem.scss';
import { useCartContext } from '../../context';
import { images } from '../../constants/images';
import Button from '../Button/Button';

const DrawerListItem = ({ item }) => {
  const { removeCartItem, isLoadingCartItem } = useCartContext();

  return (
    <li className="drawer__content-sneakersList_item">
      <img src={item.url} width={70} height={70} alt="Sneakers" />
      <div className="drawer__content-sneakersList_item-description">
        <h5>{item.description}</h5>
        <b>{item.price.toLocaleString('ru-RU')} ₸</b>
      </div>
      <Button
        className="flex__center"
        onClick={() => removeCartItem(item)}
        disabled={isLoadingCartItem[item.id]}
      >
        <img src={images.crossButton} width={32} height={32} alt="Like" />
      </Button>
    </li>
  );
};

export default DrawerListItem;
