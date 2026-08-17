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

  if (productsLoading) return <p className="loading">Loading Products...</p>;
  if (productsError)
    return (
      <p className="error products-error">
        Error when loading: {productsError}
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
