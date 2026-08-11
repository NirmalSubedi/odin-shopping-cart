import { NavLink } from "react-router";
import { CartPreview } from "./index.jsx";

export const NavBar = ({ products }) => {
  const styleNavLink = ({ isActive }) => ({
    color: isActive ? "red" : "",
  });

  return (
    <nav>
      <ul
        style={{ display: "flex", gap: "1em", listStyle: "none", padding: 0 }}
      >
        <li>
          <NavLink to="/" aria-label="go to home page" style={styleNavLink}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" aria-label="go to shop page" style={styleNavLink}>
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" aria-label="go to cart page" style={styleNavLink}>
            <CartPreview {...{ products }} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
