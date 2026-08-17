import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { CartPreview } from "../components";

it("shows value passed to it", () => {
  render(<CartPreview {...{ totalProducts: 0 }} />);

  expect(screen.getByText(/cart/i)).toHaveTextContent(/0/);
});
