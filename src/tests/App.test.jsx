import { expect, it, vi } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { routes } from "../routes.jsx";
import userEvent from "@testing-library/user-event";

const mockResolveFetch = (products) => {
  vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
    ok: true,
    json: vi.fn().mockResolvedValueOnce(products),
  });
};

const mockRejectFetch = () => {
  vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
    new Error("Test Error - Fetch Failed"),
  );
};

const setup = (initialEntries = ["/"], products, isResolve = true) => {
  const router = createMemoryRouter(routes, { initialEntries });
  const user = userEvent.setup();

  const renderAppWithResolve = () => {
    const prods = products ?? [{}];
    const IDProds = prods.map((p, i) => {
      p.id = i + 1;
      return p;
    });
    mockResolveFetch(IDProds);
    return render(<RouterProvider router={router} />);
  };
  const renderAppWithReject = () => {
    mockRejectFetch();
    return render(<RouterProvider router={router} />);
  };

  return {
    Get,
    user,
    router,
    ...(isResolve ? renderAppWithResolve : renderAppWithReject)(),
  };
};

const Get = {
  loading: () => screen.getByText(/loading/i),
  quantityInput: () => screen.getByRole("spinbutton", { name: /quantity/i }),
  cartPageLink: () => screen.getByRole("link", { name: /go to cart page/i }),
  shopPageLink: () => screen.getByRole("link", { name: /go to shop page/i }),
  homePageLink: () => screen.getByRole("link", { name: /go to home page/i }),
  decreaseBtn: () => screen.getByRole("button", { name: /decrease quantity/i }),
  increaseBtn: () => screen.getByRole("button", { name: /increase quantity/i }),
  addToCartBtn: () => screen.getByRole("button", { name: /add to cart/i }),
  removeFromCartBtn: () =>
    screen.getByRole("button", { name: /remove product from cart/i }),
};
Get.cartPreview = Get.cartPageLink;

it("shows navbar", () => {
  setup();

  expect(screen.getByRole("navigation")).toBeInTheDocument();
});

it("shows Home page by default", () => {
  setup();

  expect(
    screen.getByRole("heading", { level: 1, name: /welcome/i }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { level: 1, name: /products of the week/i }),
  ).not.toBeInTheDocument();
});

it("navigates to Home Page when clicking the corresponding link", async () => {
  const { user, router } = setup(["/cart"]);

  expect(router.state.location.pathname).toBe("/cart");

  await user.click(Get.homePageLink());

  expect(router.state.location.pathname).toBe("/");
  expect(
    screen.getByRole("heading", {
      level: 1,
    }),
  ).toHaveTextContent(/welcome/i);
});

it("navigates to Shop Page when clicking the corresponding link", async () => {
  const { user, router } = setup();

  expect(router.state.location.pathname).toBe("/");

  await user.click(Get.shopPageLink());

  expect(router.state.location.pathname).toBe("/shop");
  expect(
    await screen.findByRole("heading", {
      level: 1,
    }),
  ).toHaveTextContent(/products of the week/i);
});

it("navigates to Cart Page when clicking the corresponding link", async () => {
  const { user, router } = setup();

  expect(router.state.location.pathname).toBe("/");

  await user.click(Get.cartPageLink());

  expect(router.state.location.pathname).toBe("/cart");

  expect(
    screen.getByRole("heading", {
      level: 1,
    }),
  ).toHaveTextContent(/shopping cart is empty/i);
});

it("shows added product in cart at the Cart page", async () => {
  const products = [{ title: "Carrot" }, { title: "Durian" }];
  const { user } = setup(["/shop"], products);
  const CARROT = 0;
  const DURIAN = 1;

  await waitForElementToBeRemoved(Get.loading());

  const addToCartBtns = screen.getAllByRole("button", { name: /add to cart/i });

  await user.click(addToCartBtns[CARROT]);
  await user.click(Get.cartPageLink());

  expect(screen.queryByAltText(products[CARROT].title)).toBeInTheDocument();
  expect(screen.queryByAltText(products[DURIAN].title)).not.toBeInTheDocument();
});

it("increases cart total when products are added to cart", async () => {
  const products = [
    { id: 1, title: "apple" },
    { id: 2, title: "banana" },
    { id: 3, title: "carrot" },
  ];
  const { user } = setup(["/shop"], products);

  await waitForElementToBeRemoved(Get.loading());

  const cartPreview = Get.cartPreview();
  const productAddToCartBtns = screen.getAllByRole("button", {
    name: /add to cart/i,
  });

  expect(cartPreview).toHaveTextContent(/0/);

  await user.click(productAddToCartBtns[0]);

  expect(cartPreview).toHaveTextContent(/1/);

  await user.click(productAddToCartBtns[1]);

  expect(cartPreview).toHaveTextContent(/2/);

  await user.click(productAddToCartBtns[2]);

  expect(cartPreview).toHaveTextContent(/3/);
});

it("updates cart total when a product is already added to cart", async () => {
  const { user } = setup(["/shop"]);

  await waitForElementToBeRemoved(Get.loading());

  const cartPreview = Get.cartPreview();
  const addToCartBtn = Get.addToCartBtn();
  const increaseBtn = Get.increaseBtn();
  const decreaseBtn = Get.decreaseBtn();

  expect(cartPreview).toHaveTextContent(/0/);

  await user.click(addToCartBtn);
  expect(cartPreview).toHaveTextContent(/1/);

  await user.click(increaseBtn);
  await user.click(increaseBtn);
  await user.click(addToCartBtn);
  expect(cartPreview).toHaveTextContent(/3/);

  await user.click(decreaseBtn);
  await user.click(addToCartBtn);
  expect(cartPreview).toHaveTextContent(/2/);
});

it("decrease cart total when a product is removed from cart", async () => {
  const { user } = setup(["/shop"]);

  await waitForElementToBeRemoved(Get.loading());

  const cartPreview = Get.cartPreview();
  expect(cartPreview).toHaveTextContent(/0/);

  await user.click(Get.addToCartBtn());
  expect(cartPreview).toHaveTextContent(/1/);

  await user.click(cartPreview);
  await user.click(Get.removeFromCartBtn());

  expect(cartPreview).toHaveTextContent(/0/);
});

it("synchronizes product quantity update from cart page in shop page", async () => {
  const { user } = setup(["/shop"]);

  await waitForElementToBeRemoved(Get.loading());

  expect(Get.quantityInput()).toHaveDisplayValue(1);

  await user.click(Get.addToCartBtn());
  await user.click(Get.cartPageLink());

  const increaseBtn = Get.increaseBtn();
  await user.click(increaseBtn);
  await user.click(increaseBtn);

  expect(Get.quantityInput()).toHaveDisplayValue(3);

  await user.click(Get.shopPageLink());

  expect(Get.quantityInput()).toHaveDisplayValue(3);
});
