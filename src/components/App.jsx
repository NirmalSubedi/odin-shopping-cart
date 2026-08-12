import { Outlet } from "react-router";
import { useProducts } from "./hooks/index.jsx";
import { NavBar } from "./NavBar.jsx";

export const App = () => {
  const { products, setProducts, productsError, productsLoading } =
    useProducts();

  return (
    <>
      <NavBar {...{ products }} />
      <Outlet
        context={{ products, setProducts, productsError, productsLoading }}
      />
    </>
  );
};
