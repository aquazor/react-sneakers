import './Drawer.scss';
import { useEffect } from 'react';
import { images } from '../../constants/images';
import Button from '../Button/Button';
import DrawerList from '../DrawerList/DrawerList';

const Drawer = ({ isOpen, setIsOpen }) => {
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

        <DrawerList />

        <div className="drawer__content-footer">
          <ul className="drawer__content-footer_price">
            <li className="drawer__content-footer_price-total">
              <span>Итого: </span>
              <div></div>
              <span>22 222 руб.</span>
            </li>
            <li className="drawer__content-footer_price-tax">
              <span>Налог 5%: </span>
              <div></div>
              <span>1111 руб.</span>
            </li>
          </ul>

          <div className="drawer__content-footer_button">
            <Button className="main__button">Оформить заказ</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
