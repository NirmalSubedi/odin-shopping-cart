import styles from "../styles/ProductCounter.module.css";
import { NumberInput, LiveRegion } from "./index.jsx";
import { useAnnouncement } from "./hooks/index.jsx";

export const ProductCounter = ({
  id,
  currentQuantity,
  onQuantityDecrease,
  onQuantityChange,
  onQuantityIncrease,
  minQuantity,
}) => {
  const { announcement, updateAnnouncement } = useAnnouncement("");

  const onAnnouncementUpdate = (nextQuantity) =>
    updateAnnouncement(`Current Quantity is ${nextQuantity}`);

  return (
    <div className={styles.productCounter}>
      <label htmlFor={`product${id}-quantity`} className={styles.label}>
        Quantity
      </label>

      <button
        type="button"
        aria-label="Decrease Quantity"
        className={styles.decreaseBtn}
        disabled={currentQuantity <= minQuantity}
        onClick={(e) => {
          const nextQuantity = onQuantityDecrease(e);
          onAnnouncementUpdate(nextQuantity);
        }}
      >
        -
      </button>

      <LiveRegion {...{ announcement, testId: "quantity-live-region" }}>
        <NumberInput
          {...{
            name: `product${id}-quantity`,
            value: currentQuantity,
            min: minQuantity,
            onChange: (e) => {
              const nextQuantity = onQuantityChange(e);
              onAnnouncementUpdate(nextQuantity);
            },
          }}
        />
      </LiveRegion>

      <button
        type="button"
        aria-label="Increase Quantity"
        className={styles.increaseBtn}
        onClick={(e) => {
          const nextQuantity = onQuantityIncrease(e);
          onAnnouncementUpdate(nextQuantity);
        }}
      >
        +
      </button>
    </div>
  );
};
