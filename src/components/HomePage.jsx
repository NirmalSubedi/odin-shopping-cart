import styles from "../styles/HomePage.module.css";

export const HomePage = () => {
  console.log(styles);

  return (
    <>
      <main style={{ textAlign: "center" }}>
        <h1>
          Welcome! <span aria-hidden="true">👋</span>
        </h1>
        <p>
          To a mock online store <span aria-hidden="true">🏪</span> with a
          virtual shopping cart <span aria-hidden="true">🛒</span>.
        </p>
        <h2>Get Started</h2>
        <p>
          By adding items into your shopping cart in the <strong>Shop</strong>{" "}
          page..
        </p>
        <p>
          ..or adjusting item quantity or removing items in the{" "}
          <strong>Cart</strong> page.
        </p>
      </main>
    </>
  );
};
