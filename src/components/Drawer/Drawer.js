import './Drawer.scss';
import { useEffect } from 'react';
import { useCartContext } from '../../context';
import { images } from '../../constants/images';
import Button from '../Button/Button';
import DrawerList from '../DrawerList/DrawerList';

const taxAmount = 69;

const Drawer = ({ isOpen, setIsOpen }) => {
  const { cartItems } = useCartContext();

  useEffect(() => {
    const BODY = document.body;

    if (isOpen) {
      const lockPadding = window.innerWidth - BODY.offsetWidth + 'px';
      BODY.style.paddingRight = lockPadding;
      BODY.setAttribute('block-scroll', '');
    }

    return () => {
      BODY.style.paddingRight = 0 + 'px';
      BODY.removeAttribute('block-scroll');
    };
  }, [isOpen]);

  const price = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = (price * taxAmount) / 100;
  const totalPrice = price + tax;

  return (
    <div className="drawer">
      <div className="drawer__overlay" onClick={() => setIsOpen(false)}></div>
      <div className="drawer__content">
        <div className="drawer__content-heading">
          <h2>Корзина</h2>
          <Button className="flex__center" onClick={() => setIsOpen(false)}>
            <img src={images.crossButton} width={32} height={32} alt="Like" />
          </Button>
        </div>

        <DrawerList setIsOpen={setIsOpen} />
        {cartItems.length ? (
          <div className="drawer__content-footer">
            <ul className="drawer__content-footer_price">
              <li className="drawer__content-footer_price-total">
                <span>До налога:</span>
                <div></div>
                <span>{price.toLocaleString('ru-RU')} ₸</span>
              </li>

              <li className="drawer__content-footer_price-tax">
                <span>Налог {taxAmount}%:</span>
                <div></div>
                <span>{tax.toLocaleString('ru-RU')} ₸</span>
              </li>
              <li className="drawer__content-footer_price-tax">
                <span>После налога:</span>
                <div></div>
                <span>{totalPrice.toLocaleString('ru-RU')} ₸</span>
              </li>
            </ul>

            <div className="drawer__content-footer_button drawer__content-footer_button--forward">
              <Button className="main__button">Оформить заказ</Button>
            </div>
          </div>
        ) : (
          <div className="drawer__content-footer_button drawer__content-footer_button--backward">
            <Button className="main__button" onClick={() => setIsOpen(false)}>
              Вернуться назад
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
