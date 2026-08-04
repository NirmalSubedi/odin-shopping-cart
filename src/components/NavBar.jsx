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
          <NavLink to="/" style={styleNavLink}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" style={styleNavLink}>
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" style={styleNavLink}>
            <CartPreview {...{ products }} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
