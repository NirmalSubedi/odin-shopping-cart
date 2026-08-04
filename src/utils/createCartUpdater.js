export const createCartUpdater =
  (cart, setCart) => (addedProduct, quantity) => {
    addedProduct.quantity = quantity;

    const productIndex = cart.findIndex(
      (product) => product.id === addedProduct.id,
    );

    productIndex >= 0
      ? setCart(cart.with(productIndex, addedProduct))
      : setCart([...cart, addedProduct]);
  };
