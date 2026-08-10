import { MINIMUM_QUANTITY } from "../config.js";
import { useAnnouncement, useCounter } from "./hooks/index.jsx";
import { LiveRegion, ProductCounter } from "./index.jsx";
import { getValidProductQuantity } from "../utils/index.js";

export const ProductCard = ({ product, onAddToCart }) => {
  const { title, id, description, image, quantity } = product;
  const { count, setCount, increaseCount, decreaseCount } = useCounter(
    quantity || MINIMUM_QUANTITY,
  );
  const { announcement, updateAnnouncement } = useAnnouncement();

  const onQuantityIncrease = () => increaseCount();
  const onQuantityDecrease = () =>
    count > MINIMUM_QUANTITY ? decreaseCount() : MINIMUM_QUANTITY;
  const onQuantityChange = (e) => setCount(getValidProductQuantity(e));

  return (
    <section className="product">
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
          minQuantity: MINIMUM_QUANTITY,
        }}
      />
      <LiveRegion {...{ announcement, testId: "cart-live-region" }}>
        <button
          type="button"
          onClick={() => {
            updateAnnouncement(`Added ${quantity} ${title} to cart`);
            onAddToCart(product, count);
          }}
        >
          Add To Cart
        </button>
      </LiveRegion>
    </section>
  );
};
