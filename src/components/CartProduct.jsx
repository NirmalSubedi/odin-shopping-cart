import styles from "../styles/CartProduct.module.css";
import { MINIMUM_QUANTITY } from "../config.js";
import { getValidProductQuantity } from "../utils/index.js";
import { useCounter } from "./hooks/index.jsx";
import { ProductCounter } from "./index.jsx";

export const CartProduct = ({ product, onProductRemove, onCartUpdate }) => {
  const { quantity, id, image, title } = product;
  const { count, increaseCount, decreaseCount, setCount } =
    useCounter(quantity);

  const onQuantityIncrease = () => {
    const nextCount = increaseCount();
    onCartUpdate(product, nextCount);
  };
  const onQuantityDecrease = () => {
    const nextCount = decreaseCount();
    onCartUpdate(product, nextCount);
  };
  const onQuantityChange = (e) => {
    const quantityValue = getValidProductQuantity(e);
    setCount(quantityValue);
    onCartUpdate(product, quantityValue);
  };

  return (
    <div className={styles.product}>
      <div className={styles.imageBox}>
        <img
          src={image}
          alt={title}
          className={styles.img}
          width="100"
          height="100"
        />
      </div>

      <ProductCounter
        {...{
          id,
          currentQuantity: count,
          onQuantityDecrease,
          onQuantityIncrease,
          onQuantityChange,
          minQuantity: MINIMUM_QUANTITY,
        }}
      />

      <button
        type="button"
        aria-label="Remove product From Cart"
        className={styles.removeProductBtn}
        onClick={() => onProductRemove(product)}
      >
        Remove
      </button>
    </div>
  );
};
