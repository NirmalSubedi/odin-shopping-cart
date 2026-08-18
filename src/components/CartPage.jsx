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
  const totalProductsInCart = productsInCart.reduce(
    (sum, prod) => sum + prod.quantity,
    0,
  );

  return (
    <>
      {!hasProductsInCart && (
        <main
          className={`${styles.main} ${hasProductsInCart ? styles.products : ""}`}
        >
          <h1 className={styles.h1}>
            Shopping cart is empty <span aria-hidden="true">🍃</span>..
          </h1>
          <p className={styles.p}>
            ..Fill up your shopping cart at the{" "}
            <strong className={styles.navLinkRef}>Shop</strong> page.
          </p>
        </main>
      )}

      {hasProductsInCart && (
        <main className={styles.productsMain}>
          <h1 className={styles.productsH1}>
            <span className={styles.totalProducts}>{totalProductsInCart}</span>{" "}
            Products In Cart:
          </h1>
          <div className={styles.products}>
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
          </div>
        </main>
      )}
    </>
  );
};
