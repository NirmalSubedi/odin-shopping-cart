import { Link } from "react-router";
import styles from "../styles/ErrorPage.module.css";
import { useFocus } from "./hooks";

export const ErrorPage = () => {
  useFocus();

  return (
    <>
      <h1>Page Not Found (404)</h1>
      <Link to="/">Go To Home Page</Link>
    </>
  );
};
