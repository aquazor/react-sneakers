export const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const BRANDS = [
  { id: '1', name: 'Asics' },
  { id: '2', name: 'Adidas' },
  { id: '3', name: 'Puma' },
  { id: '4', name: 'New Balance' },
  { id: '5', name: 'Converse' },
  { id: '6', name: 'Nike' },
  { id: '7', name: 'Reebok' },
  { id: '8', name: 'Vans' },
];

export const SIZES = [
  { id: '1', value: '39' },
  { id: '2', value: '40' },
  { id: '3', value: '41' },
  { id: '4', value: '42' },
  { id: '5', value: '43' },
  { id: '6', value: '44' },
  { id: '7', value: '45' },
];

export const TABS = ['info', 'description', 'characteristics'];

export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
);
