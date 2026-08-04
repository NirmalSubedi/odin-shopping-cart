import { MINIMUM_QUANTITY } from "../config.js";
import { useCounter } from "./hooks/index.jsx";
import { ProductCounter } from "./index.jsx";
import { getValidProductQuantity } from "../utils/index.js";

export const ProductCard = ({ product, onAddToCart }) => {
  const { title, id, description, image, quantity } = product;
  const { count, setCount, increaseCount, decreaseCount } = useCounter(
    quantity || MINIMUM_QUANTITY,
  );

  const onQuantityIncrease = () => increaseCount();
  const onQuantityDecrease = () => count > MINIMUM_QUANTITY && decreaseCount();
  const onQuantityChange = (e) => {
    setCount(getValidProductQuantity(e));
  };

  return (
    <div className="product">
      <img
        src={image}
        alt=""
        style={{ maxWidth: "200px", display: "block", width: "100%" }}
      />
      <h3 className="product-title">{title}</h3>
      <p>{description}</p>

      <ProductCounter
        {...{
          id,
          currentQuantity: count,
          onQuantityIncrease,
          onQuantityDecrease,
          onQuantityChange,
        }}
      />

      <button type="button" onClick={() => onAddToCart(product, count)}>
        Add To Cart
      </button>
    </div>
  );
};
