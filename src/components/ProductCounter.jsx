import { MINIMUM_QUANTITY } from "../config.js";

export const ProductCounter = ({
  id,
  currentQuantity,
  onQuantityDecrease,
  onQuantityChange,
  onQuantityIncrease,
}) => {
  return (
    <div className="product-counter">
      <label htmlFor={`product${id}-quantity`}>Quantity</label>

      <button
        type="button"
        aria-label="Decrease Quantity"
        disabled={currentQuantity === MINIMUM_QUANTITY}
        onClick={onQuantityDecrease}
      >
        -
      </button>

      <input
        type="number"
        name={`product${id}-quantity`}
        id={`product${id}-quantity`}
        value={currentQuantity}
        min={MINIMUM_QUANTITY}
        aria-live="polite"
        style={{ maxWidth: "4ch", width: "100%" }}
        onChange={onQuantityChange}
      />

      <button
        type="button"
        aria-label="Increase Quantity"
        onClick={onQuantityIncrease}
      >
        +
      </button>
    </div>
  );
};
