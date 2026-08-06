import styles from "../styles/CartPage.module.css";
import { useOutletContext } from "react-router";
import { CartProduct } from "./index.jsx";
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

  const productsInCart = products.filter((product) => product.quantity > 0);
  const hasProductsInCart = productsInCart.length > 0;

  console.log(styles);
  return (
    <>
      <main style={{ textAlign: "center" }}>
        {!hasProductsInCart && (
          <>
            <h1>Shopping cart is empty..🍃</h1>{" "}
            <p>
              ..Fill up your shopping cart at the <strong>Shop</strong> page.
            </p>
          </>
        )}

        {hasProductsInCart && (
          <>
            <h1>Shopping Cart</h1>
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
