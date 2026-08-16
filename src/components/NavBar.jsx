import { NavLink } from "react-router";
import { CartPreview } from "./index.jsx";
import styles from "../styles/NavBar.module.css";

export const NavBar = ({ products }) => {
  const getClass = ({ isActive }) => (isActive ? styles.active : "");

  return (
    <nav>
      <ul className={styles.ul}>
        <li>
          <NavLink to="/" className={getClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" className={getClass}>
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={getClass}>
            <CartPreview {...{ products }} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
