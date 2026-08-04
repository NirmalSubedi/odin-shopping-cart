import { Outlet } from "react-router";
import { useProducts } from "./hooks/index.jsx";

export const CartLayout = () => {
  const { products, setProducts, productsError, productsLoading } =
    useProducts();

  return (
    <Outlet
      context={{ products, setProducts, productsError, productsLoading }}
    />
  );
};
