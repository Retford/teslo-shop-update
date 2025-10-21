import { BASE_URL, tesloAPI } from '@/api/tesloApi';
import type { ProductsResponse } from '../interfaces/products.response';

interface Options {
  limit?: number | string;
  offset?: number | string;
  sizes?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
}

export const getProductsAction = async (
  options: Options
): Promise<ProductsResponse> => {
  const { limit, offset, sizes, gender, maxPrice, minPrice, query } = options;

  const { data } = await tesloAPI.get<ProductsResponse>('/products', {
    params: {
      offset,
      limit,
      gender,
      sizes,
      minPrice,
      maxPrice,
      q: query,
    },
  });
  const productsWithImageUrls = data.products.map((product) => ({
    ...product,
    images: product.images.map((image) => `${BASE_URL}/files/product/${image}`),
  }));

  return {
    ...data,
    products: productsWithImageUrls,
  };
};
