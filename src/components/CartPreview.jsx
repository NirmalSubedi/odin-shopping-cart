export const CartPreview = ({ cart = [] }) => {
  const totalItems = cart.reduce(
    (sum, product) => (product.quantity ?? 0) + sum,
    0,
  );

  return `Cart ${totalItems}`;
};
