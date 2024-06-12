import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getMe } from '../redux/thunks/authThunks';
import { useSelectAuth } from '../hooks/useSelectAuth';

const RequireAuth = () => {
  const { token } = useSelectAuth().userAuth;

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getMe());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  if (!token || token === 'undefined' || token === 'null') {
    return <Navigate to={'sign-in'} />;
  }

  return <Outlet />;
};

export default RequireAuth;
