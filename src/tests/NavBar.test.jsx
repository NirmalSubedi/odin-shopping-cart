import styles from "../styles/NavBar.module.css";
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

  const link = screen.getByRole("link", { name: /home/i });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/");
});

it("shows shop link", () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>,
  );

  const link = screen.getByRole("link", { name: /shop/i });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/shop");
});

it("shows cart link", () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>,
  );

  const link = screen.getByRole("link", { name: /cart/i });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/cart");
});

it("shows total products in cart", () => {
  const products = [{ quantity: 1 }, { quantity: 2 }, { quantity: 3 }];
  render(
    <MemoryRouter>
      <NavBar {...{ products }} />
    </MemoryRouter>,
  );

  const link = screen.getByRole("link", { name: /cart/i });
  expect(link).toContainAnyByText(/6/);
});

it("shows 0 total products in cart when empty", () => {
  const products = [];
  render(
    <MemoryRouter>
      <NavBar {...{ products }} />
    </MemoryRouter>,
  );

  const link = screen.getByRole("link", { name: /cart/i });
  expect(link).toContainAnyByText(/0/);
});

it("shows cart with '0' value when empty", () => {
  const products = [];
  render(
    <MemoryRouter>
      <NavBar {...{ products }} />
    </MemoryRouter>,
  );

  expect(screen.getByRole("link", { name: /cart/i })).toHaveTextContent(/0/i);
});

it("shows cart with value 1 for one product in cart", () => {
  const products = [{ quantity: 1 }];
  render(
    <MemoryRouter>
      <NavBar {...{ products }} />
    </MemoryRouter>,
  );

  expect(screen.getByRole("link", { name: /cart/i })).toHaveTextContent(/1/i);
});

it("shows cart with value that is the sum of all product quantities", () => {
  const products = [{ quantity: 1 }, { quantity: 2 }, { quantity: 3 }];

  render(
    <MemoryRouter>
      <NavBar {...{ products }} />
    </MemoryRouter>,
  );

  expect(screen.getByRole("link", { name: /cart/i })).toHaveTextContent(/6/i);
});

it("shows cart link with accessible description", () => {
  const products = [{ quantity: 1 }, { quantity: 2 }, { quantity: 3 }];
  render(
    <MemoryRouter>
      <NavBar {...{ products }} />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("link", { name: /cart/i }),
  ).toHaveAccessibleDescription(/6 products in cart/i);
});

it("applies active class to home page link by default", () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>,
  );

  const homeLink = screen.getByRole("link", { name: /home/i });
  const cartLink = screen.getByRole("link", { name: /cart/i });
  expect(homeLink).toHaveClass(styles.active);
  expect(cartLink).not.toHaveClass(styles.active);
});

it("applies active class to shop page link when navigating to it", () => {
  render(
    <MemoryRouter initialEntries={["/shop"]}>
      <NavBar />
    </MemoryRouter>,
  );

  const homeLink = screen.getByRole("link", { name: /home/i });
  const shopLink = screen.getByRole("link", { name: /shop/i });
  expect(homeLink).not.toHaveClass(styles.active);
  expect(shopLink).toHaveClass(styles.active);
});

it("applies active class to page link when user click on it", async () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>,
  );
  const cartLink = screen.getByRole("link", { name: /cart/i });
  const homeLink = screen.getByRole("link", { name: /home/i });

  await userEvent.setup().click(cartLink);

  expect(homeLink).not.toHaveClass(styles.active);
  expect(cartLink).toHaveClass(styles.active);
});
