import { Navigate, useNavigate, useParams } from 'react-router';

import { useProductByID } from '@/admin/hooks/useProductByID';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/shop/interfaces/product.interface';
import { toast } from 'sonner';

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: productByID,
    mutation,
  } = useProductByID(id || '');

  // if (mutation.isPending) return <CustomFullScreenLoading />;

  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subTile =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  const handleSubmit = async (productLike: Partial<Product>) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success('Producto actualizado correctamente', {
          position: 'top-right',
        });
        navigate(`/admin/products/${data.id}`);
      },
      onError: (error) => {
        console.log(error);
        toast.error('Error al actualizar el producto');
      },
    });
  };

  if (isError) return <Navigate to='/admin/products' />;
  if (isLoading) return <CustomFullScreenLoading />;

  if (!productByID) {
    return <Navigate to='/admin/products' />;
  }

  return (
    <ProductForm
      product={productByID}
      title={title}
      subTitle={subTile}
      onSubmit={handleSubmit}
      isPending={mutation.isPending}
    />
  );
};
