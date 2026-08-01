import styles from "../styles/HomePage.module.css";
import { useOutletContext } from "react-router";
import { NavBar } from "./index.jsx";

export const HomePage = () => {
  const { cart } = useOutletContext();

  console.log(styles);
  return (
    <>
      <NavBar {...{ cart }} />
      <h1>This is the Home page.</h1>
    </>
  );
};
