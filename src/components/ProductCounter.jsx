import { MINIMUM_QUANTITY } from "../config.js";

export const ProductCounter = ({
  id,
  decrease,
  currentQuantity,
  handleChange,
  increase,
}) => {
  return (
    <div className="product-counter">
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
        style={{ maxWidth: "4ch", width: "100%" }}
        onChange={handleChange}
      />

      <button type="button" aria-label="Increase Quantity" onClick={increase}>
        +
      </button>
    </div>
  );
};
