import { MINIMUM_QUANTITY } from "../config.js";
import { getValidProductQuantity } from "../utils/index.js";
import { useCounter } from "./hooks/index.jsx";
import { ProductCounter } from "./index.jsx";

export const CartProduct = ({ product, onProductRemove, onCartUpdate }) => {
  const { quantity, id, image } = product;
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
    <div className="product">
      <img src={image} alt="" width="200" />

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
        aria-label="Remove product From Cart"
        type="button"
        onClick={() => onProductRemove(product)}
      >
        Remove Item
      </button>
    </div>
  );
};
