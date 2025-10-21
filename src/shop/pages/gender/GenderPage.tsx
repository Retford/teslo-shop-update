import { CustomPagination } from '@/components/custom/CustomPagination';
import { CustomJumbotron } from '@/shop/componentes/CustomJumbotron';
import { ProductsGrid } from '@/shop/componentes/ProductsGrid';
import { useProducts } from '@/shop/hooks/useProducts';
import { useParams } from 'react-router';

export const GenderPage = () => {
  const { gender } = useParams();
  const genderLabel =
    gender === 'men' ? 'Hombres' : gender === 'women' ? 'Mujeres' : 'Niños';
  const { data: productsResponse } = useProducts();

  return (
    <>
      <CustomJumbotron title={`Productos para ${genderLabel}`} />
      <ProductsGrid products={productsResponse?.products || []} />
      <CustomPagination totalPages={productsResponse?.pages || 0} />
    </>
  );
};
