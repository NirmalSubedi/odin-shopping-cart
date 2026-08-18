import styles from "../styles/CartPreview.module.css";

export const CartPreview = ({ totalProducts }) => {
  return (
    <>
      Cart{" "}
      <span
        aria-hidden="true"
        className={`${styles.itemsCount} ${styles.slideIn}`}
      >
        {totalProducts}
      </span>
    </>
  );
};
