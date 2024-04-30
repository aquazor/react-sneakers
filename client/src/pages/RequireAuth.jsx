import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getMe } from '../redux/thunks/authThunks';
import { useSelectAuth } from '../hooks/useSelectAuth';

const RequireAuth = () => {
  const {
    userAuth: { token },
  } = useSelectAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    const authMe = async () => {
      try {
        console.log('Authenticating...');
        await dispatch(getMe());
      } catch (error) {
        console.log(error);
      }

      console.log('Finished authenticating');
    };

    authMe();
  }, [dispatch]);

  if (!token || token === 'undefined' || token === 'null') {
    return <Navigate to={'sign-in'} />;
  }

  return <Outlet />;
};

export default RequireAuth;
