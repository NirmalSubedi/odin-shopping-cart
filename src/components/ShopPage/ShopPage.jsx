import styles from "./ShopPage.module.css";
import { useOutletContext } from "react-router";
import { useProducts } from "../hooks/index.jsx";
import { NavBar, ProductCard } from "../index.jsx";

export const ShopPage = () => {
  const { products, loading, error } = useProducts();
  const { cart, setCart } = useOutletContext();

  console.log(styles);

  const onAddToCart = (addedProduct, quantity) => {
    addedProduct.quantity = quantity;

    const productIndex = cart.findIndex(
      (product) => product.id === addedProduct.id,
    );

    productIndex >= 0
      ? setCart(cart.with(productIndex, addedProduct))
      : setCart([...cart, addedProduct]);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error)
    return <p className="error fetch-error">Error when loading: {error}</p>;

  return (
    <>
      <NavBar {...{ cart }} />
      <h1>This is the Shop page.</h1>

      <p>Trending Today:</p>
      {products.map((product) => (
        <ProductCard key={product.id} {...{ product, onAddToCart }} />
      ))}
    </>
  );
};
