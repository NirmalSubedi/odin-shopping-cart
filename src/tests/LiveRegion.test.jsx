import styles from "../styles/LiveRegion.module.css";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { LiveRegion } from "../components";

it("uses correct attributes", () => {
  render(<LiveRegion {...{ testId: "live-region" }} />);
  const liveRegion = screen.getByTestId("live-region");

  expect(liveRegion).toHaveAttribute("aria-live", "polite");
  expect(liveRegion).toHaveAttribute("aria-atomic", "true");
  expect(liveRegion).toHaveClass(styles.srOnly);
});

it("embeds the announcement", () => {
  const announcement = "hello world";
  render(<LiveRegion {...{ testId: "live-region", announcement }} />);
  const liveRegion = screen.getByTestId("live-region");

  expect(liveRegion).toHaveTextContent(announcement);
});
