import brands from '../brands.json';

export const sneakerCardsProperties = {
  cardWidth: 260 + 'px',
  gap: 24 + 'px',
  padding: '15px',
  cardCount: 5,
};

export const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
export const BRANDS = brands;
