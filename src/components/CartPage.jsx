import styles from "../styles/CartPage.module.css";
import { useOutletContext } from "react-router";
import { NavBar } from "./index.jsx";

export const CartPage = () => {
  const { cart } = useOutletContext();

  console.log(styles);
  return (
    <>
      <NavBar {...{ cart }} />
      <h1>This is the Cart page.</h1>
    </>
  );
};
