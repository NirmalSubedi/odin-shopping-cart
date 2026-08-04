export const cleanProductsData = (products) =>
  products.map(({ id, title, image, description }) => ({
    id,
    title,
    image,
    description,
    quantity: 0,
  }));
