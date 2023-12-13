import './Header.scss';
import { images } from '../../constants/images';
import { Logo } from '../../components';

const Header = ({ isOpen, setIsOpen }) => {
  return (
    <header className="header section__padding">
      <Logo />

      <ul className="header__info">
        <li className="header__info-cart" onClick={() => setIsOpen(true)}>
          <img src={images.cart} width={20} height={20} alt="Cart" />
          <span>Корзина</span>
        </li>

        <li className="header__info-bookmarks">
          <img src={images.favorite} width={20} height={20} alt="Favorite" />
          <span>Закладки</span>
        </li>

        <li className="header__info-profile">
          <img src={images.profile} width={20} height={20} alt="Profile" />
          <span>Профиль</span>
        </li>
      </ul>
    </header>
  );
};

export default Header;
