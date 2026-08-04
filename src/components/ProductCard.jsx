import { useCounter } from "./hooks/index.jsx";

const MINIMUM_QUANTITY = 1;

export const ProductCard = ({ product, onAddToCart }) => {
  const { title, id, quantity, description, price } = product;
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
      <h3 className="product-title">
        {title}
        <em>&nbsp;(${price})</em>
      </h3>
      <div className="details">
        <p>{description}</p>

        <label htmlFor={`product${id}-quantity`}>Quantity</label>

        <button
          type="button"
          aria-label="Decrease Quantity"
          disabled={currentQuantity === MINIMUM_QUANTITY}
          onClick={() => currentQuantity > MINIMUM_QUANTITY && decrease()}
        >
          -
        </button>

        <input
          type="number"
          name={`product${id}-quantity`}
          id={`product${id}-quantity`}
          value={currentQuantity}
          min={1}
          aria-live="polite"
          onChange={handleChange}
        />

        <button type="button" aria-label="Increase Quantity" onClick={increase}>
          +
        </button>

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
