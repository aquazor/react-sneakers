import { UseCreateContext } from '../hooks/use-create-context';

const [FavoritesContext, FavoritesProvider] = UseCreateContext('favorites');

export { FavoritesContext, FavoritesProvider };
