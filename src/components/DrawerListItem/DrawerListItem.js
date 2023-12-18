import './DrawerListItem.scss';
import Button from '../Button/Button';
import { images } from '../../constants/images';

const DrawerListItem = ({ item, onRemove }) => {
  return (
    <li className="drawer__content-sneakersList_item">
      <img src={item.url} width={70} height={70} alt="Sneakers" />
      <div className="drawer__content-sneakersList_item-description">
        <h5>{item.description}</h5>
        <b>{item.price.toLocaleString('ru-RU')} ₸</b>
      </div>
      <Button className="flex__center" onClick={() => onRemove(item.id)}>
        <img src={images.crossButton} width={32} height={32} alt="Like" />
      </Button>
    </li>
  );
};

export default DrawerListItem;
