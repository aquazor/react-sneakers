import './Logo.scss';
import { images } from '../../constants/images';

const Logo = () => {
  return (
    <div className="logo">
      <div className="logo__image">
        <img src={images.logo} width={40} height={40} alt="Logo" />
      </div>
      <div className="logo__text">
        <h2>REACT SNEAKERS</h2>
        <p>Магазин лучших кроссовок</p>
      </div>
    </div>
  );
};

export default Logo;
