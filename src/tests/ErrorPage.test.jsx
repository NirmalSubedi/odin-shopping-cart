import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { ErrorPage } from "../components";
import { MemoryRouter } from "react-router";

it("shows 404 message", () => {
  render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>,
  );

  expect(screen.getByText(/404/)).toBeInTheDocument();
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
