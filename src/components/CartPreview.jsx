export const CartPreview = ({ products = [] }) => {
  const totalItems = products.reduce(
    (sum, product) => (product.quantity ?? 0) + sum,
    0,
  );

  return `Cart (${totalItems})`;
};
