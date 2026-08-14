import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { CartProduct } from "../components";
import userEvent from "@testing-library/user-event";

it("shows product image with correct attributes", () => {
  const product = { image: "apple.png", quantity: 1, title: "A red apple" };
  render(<CartProduct {...{ product }} />);

  const image = screen.getByRole("presentation");

  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute("src", product.image);
  expect(image).toHaveAttribute("alt", product.title);
});

it("shows product quantity controls", () => {
  render(<CartProduct {...{ product: {} }} />);

  expect(
    screen.getByRole("spinbutton", { name: /quantity/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /decrease quantity/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /increase quantity/i }),
  ).toBeInTheDocument();
});

it("shows remove button", () => {
  render(<CartProduct {...{ product: {} }} />);

  expect(
    screen.getByRole("button", { name: /remove product from cart/i }),
  ).toBeInTheDocument();
});

it("calls onCartUpdate on quantity increase with correct arguments", async () => {
  const onCartUpdate = vi.fn();
  const user = userEvent.setup();
  const product = { quantity: 1 };

  render(<CartProduct {...{ product, onCartUpdate }} />);

  await user.click(screen.getByRole("button", { name: /increase quantity/i }));

  expect(onCartUpdate).toHaveBeenCalledWith(product, product.quantity + 1);
});

it("calls onCartUpdate on quantity change with correct arguments", async () => {
  const onCartUpdate = vi.fn();
  const user = userEvent.setup();
  const product = { quantity: 0 };

  render(<CartProduct {...{ product, onCartUpdate }} />);

  const input = screen.getByRole("spinbutton", { name: /quantity/i });
  const typedQuantity = 5;
  await user.type(input, String(typedQuantity));

  expect(onCartUpdate).toHaveBeenCalledWith(product, typedQuantity);
});

it("calls onCartUpdate on quantity decrease with correct arguments", async () => {
  const onCartUpdate = vi.fn();
  const user = userEvent.setup();
  const product = { quantity: 2 };

  render(<CartProduct {...{ product, onCartUpdate }} />);

  await user.click(screen.getByRole("button", { name: /decrease quantity/i }));

  expect(onCartUpdate).toHaveBeenCalledWith(product, product.quantity - 1);
});

it("does not call onCartUpdate on quantity decrease when quantity is 1", async () => {
  const onCartUpdate = vi.fn();
  const user = userEvent.setup();
  const product = { quantity: 1 };

  render(<CartProduct {...{ product, onCartUpdate }} />);

  await user.click(screen.getByRole("button", { name: /decrease quantity/i }));

  expect(onCartUpdate).not.toHaveBeenCalled();
});

it("calls onProductRemove on remove product with correct arguments", async () => {
  const onProductRemove = vi.fn();
  const user = userEvent.setup();
  const product = { quantity: "200", title: "apple" };
  render(<CartProduct {...{ product, onProductRemove }} />);

  await user.click(
    screen.getByRole("button", { name: /remove product from cart/i }),
  );

  expect(onProductRemove).toHaveBeenCalledWith(product);
});
