import { MINIMUM_QUANTITY } from "../config.js";
import { useCounter } from "./hooks/index.jsx";
import { ProductCounter } from "./index.jsx";

export const ProductCard = ({ product, onAddToCart }) => {
  const { title, id, quantity, description, price, image } = product;
  const {
    count: currentQuantity,
    setCount: setQuantity,
    increase,
    decrease,
  } = useCounter(quantity ?? MINIMUM_QUANTITY);

  const handleChange = (e) =>
    setQuantity(Math.max(MINIMUM_QUANTITY, Number(e.target.value)));

  return (
    <div className="product">
      <img
        src={image}
        alt=""
        style={{ maxWidth: "200px", display: "block", width: "100%" }}
      />

      <div className="details">
        <h3 className="product-title">
          {title}
          <em>&nbsp;(${price})</em>
        </h3>
        <p>{description}</p>

        <ProductCounter
          {...{ id, currentQuantity, increase, decrease, handleChange }}
        />

        <button
          type="button"
          onClick={() => onAddToCart(product, currentQuantity)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};
