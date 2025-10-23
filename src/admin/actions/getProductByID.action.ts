import { BASE_URL, tesloAPI } from '@/api/tesloApi';
import type { Product } from '@/shop/interfaces/product.interface';

export const getProductByIDAction = async (id: string): Promise<Product> => {
  if (!id) throw new Error('Id is required');

  if (id === 'new') {
    return {
      id: 'new',
      title: '',
      price: 0,
      description: '',
      slug: '',
      stock: 0,
      sizes: [],
      gender: 'men',
      tags: [],
      images: [],
    } as unknown as Product;
  }

  const { data } = await tesloAPI.get<Product>(`/products/${id}`);

  return {
    ...data,
    images: data.images.map((image) => {
      if (image.includes('http')) return image;
      return `${BASE_URL}/files/product/${image}`;
    }),
  };
};
