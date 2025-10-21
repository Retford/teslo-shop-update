import { Outlet } from 'react-router';
import { CustomHeader } from '../componentes/CustomHeader';
import { CustomFooter } from '../componentes/CustomFooter';

const ShopLayout = () => {
  return (
    <div className='min-h-screen bg-background'>
      <CustomHeader />

      <Outlet />

      <CustomFooter />
    </div>
  );
};

export default ShopLayout;
