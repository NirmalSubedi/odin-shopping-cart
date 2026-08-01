import {
  CartPage,
  ErrorPage,
  HomePage,
  ShopPage,
  CartLayout,
} from "./components/index.jsx";

export const routes = [
  {
    path: "/",
    element: <CartLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
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
    ],
  },
];
