import { render, screen } from "@testing-library/react";
import { ProductCard } from "../components";
import { expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

it("shows product text information", () => {
  const product = { title: "Apple", description: "A red fruit grown on trees" };
  render(<ProductCard {...{ product }} />);

  expect(screen.getByText(product.title)).toBeInTheDocument();
  expect(screen.getByText(product.description)).toBeInTheDocument();
});

it("shows product image with correct attributes", () => {
  const product = { image: "apple.png" };
  render(<ProductCard {...{ product }} />);

  const image = screen.getByRole("presentation");

  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute("src", product.image);
  expect(image).toHaveAttribute("alt", "");
});

it("shows quantity input with '1' value", () => {
  render(<ProductCard {...{ product: {} }} />);

  expect(screen.getByRole("spinbutton", { name: /quantity/i })).toHaveValue(1);
});

it("updates currentQuantity value on quantity input change", async () => {
  render(<ProductCard {...{ product: { quantity: 1 } }} />);

  const user = userEvent.setup();
  const input = screen.getByRole("spinbutton", { name: /quantity/i });

  expect(input).toHaveValue(1);
  await user.type(input, "1");
  expect(input).toHaveValue(11);
});

it("updates currentQuantity value on decrease button click", async () => {
  render(<ProductCard {...{ product: { quantity: 2 } }} />);

  const user = userEvent.setup();
  const decreaseBtn = screen.getByRole("button", { name: /decrease/i });
  const input = screen.getByRole("spinbutton", { name: /quantity/i });

  expect(input).toHaveValue(2);
  await user.click(decreaseBtn);
  expect(input).toHaveValue(1);
});

it("updates currentQuantity value on increase button click", async () => {
  render(<ProductCard {...{ product: { quantity: 2 } }} />);

  const user = userEvent.setup();
  const increaseBtn = screen.getByRole("button", { name: /increase/i });
  const input = screen.getByRole("spinbutton", { name: /quantity/i });

  expect(input).toHaveValue(2);
  await user.click(increaseBtn);
  expect(input).toHaveValue(3);
});

it("do not allow quantity to go below 1", async () => {
  render(<ProductCard {...{ product: { quantity: 1 } }} />);

  const user = userEvent.setup();
  const decreaseBtn = screen.getByRole("button", { name: /decrease/i });
  const input = screen.getByRole("spinbutton", { name: /quantity/i });

  expect(input).toHaveValue(1);
  await user.click(decreaseBtn);
  expect(input).toHaveValue(1);
});

it("calls onAddToCart callback prop on add to cart button click", async () => {
  const onAddToCart = vi.fn();
  render(<ProductCard {...{ product: {}, onAddToCart }} />);

  const user = userEvent.setup();
  const addToCartBtn = screen.getByRole("button", { name: /add to cart/i });

  expect(onAddToCart).not.toHaveBeenCalledOnce();
  await user.click(addToCartBtn);
  expect(onAddToCart).toHaveBeenCalledOnce();
});

it("announces the product title and the quantity being added to cart on add to cart button click", async () => {
  const user = userEvent.setup();

  render(
    <ProductCard
      {...{ product: { title: "Apple", quantity: 2 }, onAddToCart: vi.fn() }}
    />,
  );

  const liveRegion = screen.getByTestId("cart-live-region");
  const addToCartBtn = screen.getByRole("button", { name: /add to cart/i });

  expect(liveRegion).toBeEmptyDOMElement();

  await user.click(addToCartBtn);

  expect(screen.getByTestId("cart-live-region")).toHaveTextContent(
    /added 2 apple to cart/i,
  );
});
