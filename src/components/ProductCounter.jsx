import { NumberInput } from "./NumberInput.jsx";
import { useAnnouncement } from "./hooks/index.jsx";
import { LiveRegion } from "./LiveRegion.jsx";

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
    <div className="product-counter">
      <label htmlFor={`product${id}-quantity`}>Quantity</label>

      <button
        type="button"
        aria-label="Decrease Quantity"
        disabled={currentQuantity === minQuantity}
        onClick={(e) => {
          const nextQuantity = onQuantityDecrease(e);
          onAnnouncementUpdate(nextQuantity);
        }}
      >
        -
      </button>

      <LiveRegion {...{ announcement }}>
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
