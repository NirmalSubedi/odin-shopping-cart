import styles from "../styles/HomePage.module.css";
import { useOutletContext } from "react-router";
import { NavBar } from "./index.jsx";

export const HomePage = () => {
  const { products } = useOutletContext();

  console.log(styles);
  return (
    <>
      <NavBar {...{ products }} />
      <main style={{ textAlign: "center" }}>
        <h1>Welcome! 👋</h1>
        <p>To a mock online store 🏪 with a virtual shopping cart 🛒.</p>
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
