import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { ErrorPage } from "../components";
import { MemoryRouter } from "react-router";

it("shows page not found message", () => {
  render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("heading", { name: /page not found/i, level: 1 }),
  ).toBeInTheDocument();
});

it("shows link to home page", () => {
  render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>,
  );
  const link = screen.getByRole("link", { name: /go to home page/i });

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/");
});

it("focus h1 tag when loaded", () => {
  render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>,
  );
  const h1 = screen.getByRole("heading", { name: /page not found/i, level: 1 });

  expect(h1).toHaveFocus();
  expect(h1).toHaveAttribute("tabindex", "-1");
});
