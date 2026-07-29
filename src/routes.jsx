import {
  CartPage,
  ErrorPage,
  HomePage,
  ShopPage,
} from "./components/index.jsx";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
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
