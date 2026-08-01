import { useState } from "react";
import { Outlet } from "react-router";

export const CartLayout = () => {
  const [cart, setCart] = useState([]);

  return <Outlet context={{ cart, setCart }} />;
};
