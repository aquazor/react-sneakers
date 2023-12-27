import './Header.scss';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../constants/images';
import { FAVORITE } from '../../constants/constants';
import { Logo } from '../../components';

const Header = memo(({ setIsOpen }) => {
  return (
    <header className="header section__padding">
      <Link to={'/'}>
        <Logo />
      </Link>

      <ul className="header__info">
        <li className="header__info-cart" onClick={() => setIsOpen(true)}>
          <Link>
            <img src={images.cart} width={20} height={20} alt="Cart" />
            <span>Корзина</span>
          </Link>
        </li>

        <li className="header__info-favorites">
          <Link to={`/${FAVORITE}`}>
            <img src={images.favorite} width={20} height={20} alt="Favorite" />
            <span>Закладки</span>
          </Link>
        </li>

        <li className="header__info-profile">
          <Link>
            <img src={images.profile} width={20} height={20} alt="Profile" />
            <span>Профиль</span>
          </Link>
        </li>
      </ul>
    </header>
  );
});

export default Header;
