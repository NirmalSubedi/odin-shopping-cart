import { render, screen } from "@testing-library/react";
import * as reactRouter from "react-router";
import { expect, it, vi } from "vitest";
import { ShopPage } from "../components";
import userEvent from "@testing-library/user-event";

vi.mock("react-router", () => ({
  useOutletContext: vi.fn(),
}));

it("shows loading products when loading products data", () => {
  const context = {
    products: [],
    productsLoading: true,
  };
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(<ShopPage />);

  expect(screen.getByText(/loading products.../i)).toBeInTheDocument();
});

it("shows error when there is an error", () => {
  const context = {
    products: [],
    productsError: "Products Not Found",
  };
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(<ShopPage />);

  expect(
    screen.getByText(context.productsError, { exact: false }),
  ).toBeInTheDocument();
});

it("shows products when they are loaded", () => {
  const context = {
    products: [
      { id: 1, title: "apple" },
      { id: 2, title: "banana" },
    ],
    productsLoading: false,
  };
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(<ShopPage />);

  expect(screen.getByText(/apple/i)).toBeInTheDocument();
  expect(screen.getByText(/banana/i)).toBeInTheDocument();
});

it("calls setProducts on add to cart button click", async () => {
  const setProducts = vi.fn();
  const user = userEvent.setup();
  const context = {
    products: [{ id: 1 }],
    setProducts,
    productsLoading: false,
  };
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(<ShopPage />);

  expect(setProducts).not.toHaveBeenCalled();

  await user.click(screen.getByRole("button", { name: /add to cart/i }));

  expect(setProducts).toHaveBeenCalled();
});
