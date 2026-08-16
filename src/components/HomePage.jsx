import styles from "../styles/HomePage.module.css";
import { useFocus } from "./hooks";

export const HomePage = () => {
  useFocus();

  return (
    <>
      <main className={styles.main}>
        <h1 aria-describedby="desc">
          Welcome! <span aria-hidden="true">👋</span>
        </h1>
        <div className={`${styles.textBody}`}>
          <p id="desc">
            To a mock online store <span aria-hidden="true">🏪</span> with a
            virtual shopping cart <span aria-hidden="true">🛒</span>.
          </p>
        </div>
        <h2>Get Started</h2>
        <div className={`${styles.textBody}`}>
          <p>
            By adding products into your shopping cart in the{" "}
            <strong>Shop</strong> page..
          </p>
          <p>
            ..then adjusting product quantity or removing products in the{" "}
            <strong>Cart</strong> page.
          </p>
        </div>
      </main>
    </>
  );
};
