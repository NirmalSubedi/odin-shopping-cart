import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { HomePage } from "../components";

it("shows welcome message", () => {
  render(<HomePage />);

  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});

it("shows site description", () => {
  render(<HomePage />);

  expect(screen.getByText(/to a mock online store/i)).toBeInTheDocument();
});

it("shows instructions", () => {
  render(<HomePage />);

  expect(screen.getByText(/get started/i)).toBeInTheDocument();
  expect(screen.getByText(/by adding/i)).toBeInTheDocument();
  expect(screen.getByText(/or adjusting/i)).toBeInTheDocument();
});
