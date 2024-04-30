import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getTokenFromLocal } from '../utils/getTokenFromLocal';
import { getMe } from '../redux/thunks/authThunks';

const RequireAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authMe = async () => {
      try {
        console.log('Authenticating...');
        await dispatch(getMe()).unwrap();
      } catch (error) {
        console.log(error);
      }

      console.log('Finished authenticating');
    };

    authMe();
  }, [dispatch]);

  const token = getTokenFromLocal();

  if (!token || token === 'undefined' || token === 'null') {
    return <Navigate to={'sign-in'} />;
  }

  return <Outlet />;
};

export default RequireAuth;
