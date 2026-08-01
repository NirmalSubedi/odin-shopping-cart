import { useCounter } from "./hooks/index.jsx";

const MINIMUM_QUANTITY = 1;

export const ProductCard = ({ product, onAddToCart }) => {
  const { title, id, quantity, description } = product;
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
      <h3 className="product-title">{title}</h3>
      <div className="details">
        <p>{description}</p>
        <button
          type="button"
          disabled={currentQuantity === MINIMUM_QUANTITY}
          onClick={() => currentQuantity > MINIMUM_QUANTITY && decrease()}
        >
          - Decrease Quantity
        </button>

        <input
          type="number"
          name={`product${id}-quantity`}
          id={`product${id}-quantity`}
          value={currentQuantity}
          min={1}
          onChange={handleChange}
        />

        <button type="button" onClick={increase}>
          + Increase Quantity
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
