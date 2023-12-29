import './SearchPopup.scss';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const openedTime = 2000; // opened time (in ms) before popup unmounts
const animationTime = 450; // css fade-out animation time (in ms) MINUS 50
const visibleTime = openedTime - animationTime; // visibility time (in ms) before fade-out animation starts

const SearchPopup = ({ searchTerm }) => {
  const [searchPopupOpen, setSearchPopupOpen] = useState(false);
  const [searchPopupVisible, setSearchPopupVisible] = useState(false);

  useEffect(() => {
    if (searchTerm === '') {
      setSearchPopupVisible(false);
      // fade-out animation starts

      setTimeout(() => {
        setSearchPopupOpen(false);
        // fade-out animation ends
      }, animationTime);

      return;
    }

    if (searchTerm) {
      setSearchPopupOpen(true);
      setSearchPopupVisible(true);
    }

    const searchPopupOpenTimer = setTimeout(() => {
      setSearchPopupOpen(false);
    }, openedTime);

    const searchPopupVisibleTimer = setTimeout(() => {
      setSearchPopupVisible(false);
    }, visibleTime);

    return () => {
      clearTimeout(searchPopupVisibleTimer);
      clearTimeout(searchPopupOpenTimer);
    };
  }, [searchTerm]);

  let popupClassName = 'searchPopup flex__center';

  if (searchPopupOpen) {
    popupClassName += searchPopupVisible ? ' searchPopup--open' : ' searchPopup--close';
  }

  return (
    searchPopupOpen &&
    createPortal(
      <div className={popupClassName}>
        <div className="searchPopup__content">
          <p>{searchTerm}</p>
        </div>
      </div>,
      document.querySelector('.modal__container')
    )
  );
};

export default SearchPopup;
