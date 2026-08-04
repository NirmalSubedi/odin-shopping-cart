export const createCartUpdater =
  (products, setProducts) => (productToUpdate, quantity) => {
    const updatedProduct = { ...productToUpdate, quantity };

    const productIndex = products.findIndex(
      (product) => product.id === updatedProduct.id,
    );
    const hasProduct = productIndex >= 0;
    if (hasProduct) {
      setProducts(products.with(productIndex, updatedProduct));
    }
  };
