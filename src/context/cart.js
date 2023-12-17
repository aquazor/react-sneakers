import { UseCreateContext } from '../hooks/use-create-context';

const [CartContext, CartProvider] = UseCreateContext('cart');

export { CartContext, CartProvider };
