import { NavLink } from "react-router";
import { CartPreview } from "./index.jsx";
import styles from "../styles/NavBar.module.css";

export const NavBar = ({ products }) => {
  const getClass = ({ isActive }) => {
    const classes = [styles.a];
    if (isActive) classes.push(styles.active);
    return classes.join(" ");
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
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
