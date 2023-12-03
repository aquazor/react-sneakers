import './Logo.scss';
import { images } from '../../constants/images';

const Logo = ({ className }) => {
  return (
    <div className={`logo ${className}`}>
      <div className="logo-image">
        <img src={images.logo} width={40} height={40} alt="Logo" />
      </div>
      <div className="logo-text">
        <h2>REACT SNEAKERS</h2>
        <p>Магазин лучших кроссовок</p>
      </div>
    </div>
  );
};

export default Logo;
