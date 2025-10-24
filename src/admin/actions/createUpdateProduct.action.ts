import { BASE_URL, tesloAPI } from '@/api/tesloApi';
import type { Product } from '@/shop/interfaces/product.interface';

export const createUpdateProductAction = async (
  productLike: Partial<Product> & { files?: File[] }
): Promise<Product> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, user, images = [], files = [], ...rest } = productLike;

  const isCreating = id === 'new';

  rest.stock = Number(rest.stock || 0);
  rest.price = Number(rest.price || 0);

  // Preparar las imágenes
  if (files.length > 0) {
    const newImagesNames = await uploadFiles(files);
    images.push(...newImagesNames);
  }

  const imagesToSave = images.map((image) => {
    if (image.includes('http')) return image.split('/').pop() || '';
    return image;
  });

  const { data } = await tesloAPI<Product>({
    url: isCreating ? '/products' : `/products/${id}`,
    method: isCreating ? 'POST' : 'PATCH',
    data: {
      ...rest,
      images: imagesToSave,
    },
  });

  return {
    ...data,
    images: data.images.map((image) => {
      if (image.includes('http')) return image;
      return `${BASE_URL}/files/product/${image}`;
    }),
  };
};

export interface FileUploadResponse {
  secureUrl: string;
  fileName: string;
}

const uploadFiles = async (files: File[]) => {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await tesloAPI<FileUploadResponse>({
      url: '/files/product',
      method: 'POST',
      data: formData,
    });

    return data.fileName;
  });
  const uploadedFileNames = await Promise.all(uploadPromises);
  return uploadedFileNames;
};
