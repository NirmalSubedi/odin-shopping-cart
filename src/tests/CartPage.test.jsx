import { expect, it, vi } from "vitest";
import * as reactRouter from "react-router";
import { render, screen } from "@testing-library/react";
import { CartPage } from "../components";
import userEvent from "@testing-library/user-event";

vi.mock("react-router", () => ({
  useOutletContext: vi.fn(),
}));

it("shows content for empty cart", () => {
  const context = { products: [] };
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(<CartPage />);

  expect(screen.getByText(/shopping cart is empty/i)).toBeInTheDocument();
});

it("shows content for non-empty cart", () => {
  const context = { products: [{ id: 1, quantity: 1 }] };
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(<CartPage />);

  expect(
    screen.getByRole("heading", { name: /products in shopping cart/i }),
  ).toBeInTheDocument();
});

it("calls setProducts callback on decrease quantity button click", async () => {
  const setProducts = vi.fn();
  const context = { products: [{ id: 1, quantity: 2 }], setProducts };
  const user = userEvent.setup();
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(<CartPage />);

  expect(setProducts).not.toHaveBeenCalled();

  await user.click(screen.getByRole("button", { name: /decrease quantity/i }));

  expect(setProducts).toHaveBeenCalled();
});

it("does not call setProducts callback when quantity is 1 on decrease quantity button click", async () => {
  const setProducts = vi.fn();
  const context = { products: [{ id: 1, quantity: 1 }], setProducts };
  const user = userEvent.setup();
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(<CartPage />);

  expect(setProducts).not.toHaveBeenCalled();

  await user.click(screen.getByRole("button", { name: /decrease quantity/i }));

  expect(setProducts).not.toHaveBeenCalled();
});

it("calls setProducts callback on increase quantity button click", async () => {
  const setProducts = vi.fn();
  const context = { products: [{ id: 1, quantity: 1 }], setProducts };
  const user = userEvent.setup();
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(<CartPage />);

  expect(setProducts).not.toHaveBeenCalled();

  await user.click(screen.getByRole("button", { name: /increase quantity/i }));

  expect(setProducts).toHaveBeenCalled();
});

it("calls setProducts callback on remove product button click", async () => {
  const setProducts = vi.fn();
  const context = { products: [{ id: 1, quantity: 1 }], setProducts };
  const user = userEvent.setup();
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(<CartPage />);

  expect(setProducts).not.toHaveBeenCalled();

  await user.click(
    screen.getByRole("button", { name: /remove product from cart/i }),
  );

  expect(setProducts).toHaveBeenCalled();
});
