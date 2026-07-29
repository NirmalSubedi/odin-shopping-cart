import { CartPage, HomePage, ShopPage } from "./components/index.jsx";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "shop",
    element: <ShopPage />,
  },
  {
    path: "cart",
    element: <CartPage />,
  },
];
