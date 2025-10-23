import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductByIDAction } from '../actions/getProductByID.action';
import type { Product } from '@/shop/interfaces/product.interface';
import { createUpdateProductAction } from '../actions/createUpdateProduct.action';

export const useProductByID = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIDAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    // enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      // Invalidar caché
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({
        queryKey: ['product', { id: product.id }],
      });
      // actualizar queryData
      queryClient.setQueryData(['products', { id: product.id }], product);
    },
  });

  // const handleSubmitForm = async (productLike: Partial<Product>) => {
  //   console.log({ productLike });
  // };

  return { ...query, mutation };
};
