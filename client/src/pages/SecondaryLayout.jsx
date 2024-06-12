import { Header } from '../components';
import { Outlet } from 'react-router-dom';

const SecondaryLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default SecondaryLayout;
