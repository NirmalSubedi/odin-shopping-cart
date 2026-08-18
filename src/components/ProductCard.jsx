import styles from "../styles/ProductCard.module.css";
import { MINIMUM_QUANTITY } from "../config.js";
import { useAnnouncement, useCounter } from "./hooks/index.jsx";
import { LiveRegion, ProductCounter } from "./index.jsx";
import { getValidProductQuantity } from "../utils/index.js";
import { useState } from "react";

export const ProductCard = ({ product, onAddToCart }) => {
  const { title, id, description, image, quantity } = product;
  const { count, setCount, increaseCount, decreaseCount } = useCounter(
    quantity || MINIMUM_QUANTITY,
  );
  const { announcement, updateAnnouncement } = useAnnouncement();
  const [isHidingDetails, setIsHidingDetails] = useState(true);
  const isInCart = quantity > 0;

  const onDetailsToggle = () => setIsHidingDetails(!isHidingDetails);
  const onQuantityIncrease = () => increaseCount();
  const onQuantityDecrease = () =>
    count > MINIMUM_QUANTITY ? decreaseCount() : MINIMUM_QUANTITY;
  const onQuantityChange = (e) => setCount(getValidProductQuantity(e));

  return (
    <section
      className={`${styles.product} ${isInCart ? styles.productInCart : ""}`}
    >
      <div className={styles.imageBox}>
        <img
          src={image}
          alt=""
          className={styles.img}
          width="200"
          height="200"
        />
      </div>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.descriptionBox}>
        <p
          className={`${styles.description} ${isHidingDetails && styles.lessDescription}`}
        >
          {description}
        </p>
        <button
          type="button"
          className={styles.showDetailsBtn}
          onClick={onDetailsToggle}
          aria-hidden="true"
        >
          {isHidingDetails ? "show" : "hide"} details
        </button>
      </div>

      <div className={styles.controlLayout}>
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
            className={styles.addToCartBtn}
            onClick={() => {
              updateAnnouncement(`Added ${quantity} ${title} to cart`);
              onAddToCart(product, count);
            }}
          >
            Add To Cart
          </button>
        </LiveRegion>
      </div>
    </section>
  );
};
