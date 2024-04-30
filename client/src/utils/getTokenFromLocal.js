export const getTokenFromLocal = () => {
  const token = localStorage.getItem('token');

  if (!token || token === 'null' || token === 'undefined') {
    return null;
  }

  return token;
};
