import styles from "../styles/ShopPage.module.css";
import { useOutletContext } from "react-router";
import { ProductCard } from "./index.jsx";
import { createCartUpdater } from "../utils/index.js";
import { useFocus } from "./hooks/useFocus.jsx";

export const ShopPage = () => {
  useFocus();
  const { products, setProducts, productsError, productsLoading } =
    useOutletContext();

  const onAddToCart = createCartUpdater(products, setProducts);

  if (productsLoading)
    return (
      <div className={styles.loadingBox}>
        <p className={styles.loading}>Loading Products...</p>
      </div>
    );
  if (productsError)
    return (
      <p className={styles.productsError}>
        Error when loading: {productsError}
        <span>Please try again later.</span>
      </p>
    );

  return (
    <>
      <h1 className={styles.h1}>Products of the Week</h1>
      <main className={styles.main}>
        {products.map((product) => {
          return <ProductCard key={product.id} {...{ product, onAddToCart }} />;
        })}
      </main>
    </>
  );
};
