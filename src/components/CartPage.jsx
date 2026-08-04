import styles from "../styles/CartPage.module.css";
import { useOutletContext } from "react-router";
import { CartProduct, NavBar } from "./index.jsx";
import { createCartUpdater } from "../utils/index.js";

export const CartPage = () => {
  const { products, setProducts } = useOutletContext();

  const onProductRemove = (productToRemove) => {
    productToRemove.quantity = 0;

    const updatedProducts = products.map((product) =>
      product.id === productToRemove.id ? productToRemove : product,
    );

    setProducts(updatedProducts);
  };
  const onCartUpdate = createCartUpdater(products, setProducts);

  console.log(styles);
  return (
    <>
      <NavBar {...{ products }} />
      <h1>This is the Cart page.</h1>
      <main>
        {products
          .filter((product) => product.quantity > 0)
          .map((product) => (
            <CartProduct
              key={product.id}
              {...{
                product,
                onCartUpdate,
                onProductRemove,
              }}
            />
          ))}
      </main>
    </>
  );
};
