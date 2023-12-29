import './Input.scss';
import { memo, useCallback, useEffect, useRef } from 'react';
import { images } from '../../constants/images';

const Input = memo(({ searchTerm, setSearchTerm }) => {
  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
  }, []);

  const handleChange = useCallback(
    (event) => {
      setSearchTerm(event.target.value);
    },
    [setSearchTerm]
  );

  return (
    <div className="inputBlock flex__center">
      <img src={images.search} alt="Search" />
      <input
        ref={input}
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
});

export default Input;
