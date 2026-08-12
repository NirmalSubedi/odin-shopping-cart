export const CartPreview = ({ products = [] }) => {
  const totalProducts = products.reduce(
    (sum, product) => (product.quantity ?? 0) + sum,
    0,
  );

  return `Cart (${totalProducts})`;
};
