export const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const BRANDS = [
  'Asics',
  'Adidas',
  'Puma',
  'New Balance',
  'Converse',
  'Nike',
  'Reebok',
  'Vans',
];

export const SIZES = ['39', '40', '41', '42', '43', '44', '45'];

export const TABS = ['info', 'description', 'characteristics'];

export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
);
