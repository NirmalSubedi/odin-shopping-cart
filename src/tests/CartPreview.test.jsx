import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { CartPreview } from "../components";

it("shows cart with '0' value when empty", () => {
  render(<CartPreview />);

  expect(screen.getByText("Cart (0)")).toBeInTheDocument();
});

it("shows cart with value 1 for one product in cart", () => {
  const products = [{ quantity: 1 }];

  render(<CartPreview {...{ products }} />);

  expect(screen.getByText(/1/)).toBeInTheDocument();
});

it("shows cart with value that is the sum of all product quantities", () => {
  const products = [{ quantity: 1 }, { quantity: 2 }, { quantity: 3 }];

  render(<CartPreview {...{ products }} />);

  expect(screen.getByText(/6/)).toBeInTheDocument();
});
