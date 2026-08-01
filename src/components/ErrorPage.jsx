import { Link } from "react-router";
import styles from "../styles/ErrorPage.module.css";

export const ErrorPage = () => {
  console.log(styles);

  return (
    <>
      <h1>Page Not Found (404)</h1>
      <Link to="/">Go To Home Page</Link>
    </>
  );
};
