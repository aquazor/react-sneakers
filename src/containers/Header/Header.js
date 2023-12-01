import './Header.scss';
import { images } from '../../constants/images';

const Header = () => {
  return (
    <header className="header section__padding">
      <div className="header__logo logo">
        <div className="header__logo-image logo-image">
          <img src={images.logo} width={40} height={40} alt="Logo" />
        </div>
        <div className="header__logo-text logo-text">
          <h2>REACT SNEAKERS</h2>
          <p>Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="header__info">
        <li className="header__info_cart">
          <img src={images.cart} width={20} height={20} alt="Cart" />
          <span>Amount</span>
        </li>

        <li className="header__info_bookmarks">
          <img src={images.favorite} width={20} height={20} alt="Favorite" />
          <span>Закладки</span>
        </li>

        <li className="header__info_profile">
          <img src={images.profile} width={20} height={20} alt="Profile" />
          <span>Профиль</span>
        </li>
      </ul>
    </header>
  );
};

export default Header;
