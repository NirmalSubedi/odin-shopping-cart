import { Link } from "react-router";
import styles from "../styles/ErrorPage.module.css";
import { useFocus } from "./hooks";

export const ErrorPage = () => {
  useFocus();

  return (
    <main className={styles.main}>
      <h1>(404) Page Not Found</h1>
      <Link to="/" className={styles.link}>
        Go To Home Page
      </Link>
    </main>
  );
};
