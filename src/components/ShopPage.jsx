import styles from "../styles/ShopPage.module.css";
import { useOutletContext } from "react-router";
import { NavBar, ProductCard } from "./index.jsx";
import { createCartUpdater } from "../utils/index.js";

export const ShopPage = () => {
  const { products, setProducts, productsError, productsLoading } =
    useOutletContext();

  console.log(styles);

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
      <NavBar {...{ products }} />
      <h1>This is the Shop page.</h1>

      <h2>Trending Today:</h2>
      <main>
        {products.map((product) => {
          return <ProductCard key={product.id} {...{ product, onAddToCart }} />;
        })}
      </main>
    </>
  );
};
