import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { NavBar } from "../components";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

it("shows home link", () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>,
  );

  const link = screen.getByRole("link", { name: /go to home page/i });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/");
});

it("shows shop link", () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>,
  );

  const link = screen.getByRole("link", { name: /go to shop page/i });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/shop");
});

it("shows shop link", () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>,
  );

  const link = screen.getByRole("link", { name: /go to cart page/i });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/cart");
});

it("shows total items in cart", () => {
  const products = [{ quantity: 1 }, { quantity: 2 }, { quantity: 3 }];
  render(
    <MemoryRouter>
      <NavBar {...{ products }} />
    </MemoryRouter>,
  );

  const link = screen.getByRole("link", { name: /go to cart page/i });
  expect(link).toContainAnyByText(/6/);
});

it("shows 0 total items in cart when empty", () => {
  const products = [];
  render(
    <MemoryRouter>
      <NavBar {...{ products }} />
    </MemoryRouter>,
  );

  const link = screen.getByRole("link", { name: /go to cart page/i });
  expect(link).toContainAnyByText(/0/);
});

it("applies active class to home page link by default", () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>,
  );

  const homeLink = screen.getByRole("link", { name: /go to home page/i });
  const cartLink = screen.getByRole("link", { name: /go to cart page/i });
  expect(homeLink).toHaveClass("active");
  expect(cartLink).not.toHaveClass("active");
});

it("applies active class to shop page link when navigating to it", () => {
  render(
    <MemoryRouter initialEntries={["/shop"]}>
      <NavBar />
    </MemoryRouter>,
  );

  const homeLink = screen.getByRole("link", { name: /go to home page/i });
  const shopLink = screen.getByRole("link", { name: /go to shop page/i });
  expect(homeLink).not.toHaveClass("active");
  expect(shopLink).toHaveClass("active");
});

it("applies active class to page link when user click on it", async () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>,
  );
  const cartLink = screen.getByRole("link", { name: /go to cart page/i });
  const homeLink = screen.getByRole("link", { name: /go to home page/i });

  await userEvent.setup().click(cartLink);

  expect(homeLink).not.toHaveClass("active");
  expect(cartLink).toHaveClass("active");
});
