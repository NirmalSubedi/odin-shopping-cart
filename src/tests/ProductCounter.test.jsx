import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { ProductCounter } from "../components";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

it("shows quantity input label", () => {
  render(<ProductCounter {...{ id: 1 }} />);

  expect(screen.getByText(/^quantity$/i)).toBeInTheDocument();
});

it("links quantity label to quantity input", () => {
  render(<ProductCounter {...{ id: 1 }} />);

  expect(screen.queryByLabelText(/^quantity$/i)).not.toBeNull();
});

it("shows the currentQuantity prop value as quantity input value", () => {
  const currentQuantity = 2;
  render(<ProductCounter {...{ currentQuantity }} />);

  expect(screen.getByRole("spinbutton", { name: /quantity/i })).toHaveValue(
    currentQuantity,
  );
});

it("disables decrease button when currentQuantity is same value as minimum quantity", () => {
  const currentQuantity = 1;
  const minQuantity = 1;
  render(<ProductCounter {...{ currentQuantity, minQuantity }} />);

  expect(currentQuantity).toBe(minQuantity);
  expect(
    screen.getByRole("button", { name: /decrease quantity/i }),
  ).toBeDisabled();
});

it("does not disable decrease button when minimum quantity and current quantity are undefined", () => {
  render(<ProductCounter />);

  expect(
    screen.getByRole("button", { name: /decrease quantity/i }),
  ).not.toBeDisabled();
});

it("calls onQuantityChange prop for quantity input change event", async () => {
  const onQuantityChange = vi.fn();
  const user = userEvent.setup();

  render(<ProductCounter {...{ onQuantityChange }} />);

  await user.type(screen.getByRole("spinbutton", { name: /quantity/i }), "1");

  expect(onQuantityChange).toHaveBeenCalled();
});

it("calls onQuantityDecrease prop when pressing the decrease button", async () => {
  const onQuantityDecrease = vi.fn();

  render(<ProductCounter {...{ onQuantityDecrease }} />);

  await userEvent
    .setup()
    .click(screen.getByRole("button", { name: /decrease quantity/i }));

  expect(onQuantityDecrease).toHaveBeenCalledOnce();
});

it("calls onQuantityIncrease prop when pressing the increase button", async () => {
  const onQuantityIncrease = vi.fn();

  render(<ProductCounter {...{ onQuantityIncrease }} />);

  await userEvent
    .setup()
    .click(screen.getByRole("button", { name: /increase quantity/i }));

  expect(onQuantityIncrease).toHaveBeenCalledOnce();
});

it("announces the updated quantity after input change", async () => {
  function Wrapper() {
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const onQuantityChange = (e) => {
      setCurrentQuantity(e.target.value);
      return e.target.value;
    };
    return <ProductCounter {...{ currentQuantity, onQuantityChange }} />;
  }

  render(<Wrapper />);

  const user = userEvent.setup();
  const liveRegion = screen.getByTestId("quantity-live-region");
  const input = screen.getByRole("spinbutton", { name: /quantity/i });

  expect(liveRegion).toBeEmptyDOMElement();

  await user.clear(input);
  await user.type(input, "123");

  expect(screen.getByTestId("quantity-live-region")).toHaveTextContent(
    /current quantity is 123/i,
  );
});

it("announces the updated quantity after decrease button click", async () => {
  function Wrapper() {
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const onQuantityDecrease = () => {
      const nextQuantity = currentQuantity - 1;
      setCurrentQuantity(nextQuantity);
      return nextQuantity;
    };
    return <ProductCounter {...{ currentQuantity, onQuantityDecrease }} />;
  }

  render(<Wrapper />);

  const user = userEvent.setup();
  const liveRegion = screen.getByTestId("quantity-live-region");
  const decreaseBtn = screen.getByRole("button", {
    name: /decrease quantity/i,
  });

  expect(liveRegion).toBeEmptyDOMElement();

  await user.click(decreaseBtn);

  expect(screen.getByTestId("quantity-live-region")).toHaveTextContent(
    /current quantity is 0/i,
  );
});

it("announces the updated quantity after increase button click", async () => {
  function Wrapper() {
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const onQuantityIncrease = () => {
      const nextQuantity = currentQuantity + 1;
      setCurrentQuantity(nextQuantity);
      return nextQuantity;
    };
    return <ProductCounter {...{ currentQuantity, onQuantityIncrease }} />;
  }

  render(<Wrapper />);

  const user = userEvent.setup();
  const liveRegion = screen.getByTestId("quantity-live-region");
  const increaseBtn = screen.getByRole("button", {
    name: /increase quantity/i,
  });

  expect(liveRegion).toBeEmptyDOMElement();

  await user.click(increaseBtn);

  expect(screen.getByTestId("quantity-live-region")).toHaveTextContent(
    /current quantity is 2/i,
  );
});
