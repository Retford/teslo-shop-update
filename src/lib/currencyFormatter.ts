export const currencyFormatter = (mount: number) => {
  return mount.toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
  });
};
