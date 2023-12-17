import './Input.scss';
import { images } from '../../constants/images';

const Input = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="inputBlock flex__center">
      <img src={images.search} alt="Search" />
      <input
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
