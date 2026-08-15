import { expect, it, vi } from "vitest";
import * as reactRouter from "react-router";
import { render, screen } from "@testing-library/react";
import { CartPage } from "../components";
import userEvent from "@testing-library/user-event";

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

it("shows content for empty cart", () => {
  const context = { products: [] };
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(
    <reactRouter.MemoryRouter>
      <CartPage />
    </reactRouter.MemoryRouter>,
  );

  expect(
    screen.getByRole("heading", { name: /shopping cart is empty/i }),
  ).toBeInTheDocument();
});

it("shows content for non-empty cart", () => {
  const context = { products: [{ id: 1, quantity: 1 }] };
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(
    <reactRouter.MemoryRouter>
      <CartPage />
    </reactRouter.MemoryRouter>,
  );

  expect(
    screen.getByRole("heading", { name: /products in shopping cart/i }),
  ).toBeInTheDocument();
});

it("focus h1 tag when loaded", () => {
  const context = { products: [{ id: 1, quantity: 1 }] };
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(
    <reactRouter.MemoryRouter>
      <CartPage />
    </reactRouter.MemoryRouter>,
  );

  const h1 = screen.getByRole("heading", {
    name: /products in shopping cart/i,
    level: 1,
  });

  expect(h1).toHaveFocus();
  expect(h1).toHaveAttribute("tabindex", "-1");
});

it("calls setProducts callback on decrease quantity button click", async () => {
  const setProducts = vi.fn();
  const context = { products: [{ id: 1, quantity: 2 }], setProducts };
  const user = userEvent.setup();
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(
    <reactRouter.MemoryRouter>
      <CartPage />
    </reactRouter.MemoryRouter>,
  );

  expect(setProducts).not.toHaveBeenCalled();

  await user.click(screen.getByRole("button", { name: /decrease quantity/i }));

  expect(setProducts).toHaveBeenCalled();
});

it("does not call setProducts callback when quantity is 1 on decrease quantity button click", async () => {
  const setProducts = vi.fn();
  const context = { products: [{ id: 1, quantity: 1 }], setProducts };
  const user = userEvent.setup();
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(
    <reactRouter.MemoryRouter>
      <CartPage />
    </reactRouter.MemoryRouter>,
  );

  expect(setProducts).not.toHaveBeenCalled();

  await user.click(screen.getByRole("button", { name: /decrease quantity/i }));

  expect(setProducts).not.toHaveBeenCalled();
});

it("calls setProducts callback on increase quantity button click", async () => {
  const setProducts = vi.fn();
  const context = { products: [{ id: 1, quantity: 1 }], setProducts };
  const user = userEvent.setup();
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(
    <reactRouter.MemoryRouter>
      <CartPage />
    </reactRouter.MemoryRouter>,
  );

  expect(setProducts).not.toHaveBeenCalled();

  await user.click(screen.getByRole("button", { name: /increase quantity/i }));

  expect(setProducts).toHaveBeenCalled();
});

it("calls setProducts callback on remove product button click", async () => {
  const setProducts = vi.fn();
  const context = { products: [{ id: 1, quantity: 1 }], setProducts };
  const user = userEvent.setup();
  vi.spyOn(reactRouter, "useOutletContext").mockReturnValueOnce(context);

  render(
    <reactRouter.MemoryRouter>
      <CartPage />
    </reactRouter.MemoryRouter>,
  );

  expect(setProducts).not.toHaveBeenCalled();

  await user.click(
    screen.getByRole("button", { name: /remove product from cart/i }),
  );

  expect(setProducts).toHaveBeenCalled();
});
