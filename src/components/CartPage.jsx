import styles from "../styles/CartPage.module.css";
import { useOutletContext } from "react-router";
import { CartProduct } from "./index.jsx";
import { createCartUpdater } from "../utils/index.js";
import { useFocus } from "./hooks/useFocus.jsx";

export const CartPage = () => {
  useFocus();
  const { products, setProducts } = useOutletContext();

  const onProductRemove = (productToRemove) => {
    productToRemove.quantity = 0;

    const updatedProducts = products.map((product) =>
      product.id === productToRemove.id ? productToRemove : product,
    );

    setProducts(updatedProducts);
  };
  const onCartUpdate = createCartUpdater(products, setProducts);

  const productsInCart = products.filter((product) => product.quantity > 0);
  const hasProductsInCart = productsInCart.length > 0;

  return (
    <>
      <main className={styles.main}>
        {!hasProductsInCart && (
          <>
            <h1 className={styles.h1}>
              Shopping cart is empty <span aria-hidden="true">🍃</span>..
            </h1>
            <p className={styles.p}>
              ..Fill up your shopping cart at the{" "}
              <strong className={styles.navLinkRef}>Shop</strong> page.
            </p>
          </>
        )}

        {hasProductsInCart && (
          <>
            <h1>Products In Shopping Cart:</h1>
            {productsInCart.map((product) => (
              <CartProduct
                key={product.id}
                {...{
                  product,
                  onCartUpdate,
                  onProductRemove,
                }}
              />
            ))}
          </>
        )}
      </main>
    </>
  );
};
