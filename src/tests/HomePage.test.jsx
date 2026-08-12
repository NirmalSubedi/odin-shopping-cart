import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { HomePage } from "../components";
import { MemoryRouter } from "react-router";

it("shows welcome message", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});

it("shows site description", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.getByText(/to a mock online store/i)).toBeInTheDocument();
});

it("shows instructions", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.getByText(/get started/i)).toBeInTheDocument();
  expect(screen.getByText(/by adding/i)).toBeInTheDocument();
  expect(screen.getByText(/then adjusting/i)).toBeInTheDocument();
});

it("h1 has accessible description", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("heading", { level: 1, name: /welcome/i }),
  ).toHaveAccessibleDescription(/to a mock online store/i);
});

it("focus h1 tag when loaded", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
  const h1 = screen.getByRole("heading", { name: /welcome/i, level: 1 });

  expect(h1).toHaveFocus();
  expect(h1).toHaveAttribute("tabindex", "-1");
});
