import { getTokenFromLocal } from './getTokenFromLocal';

export const getAuthHeader = () => `Bearer ${getTokenFromLocal()}`;
