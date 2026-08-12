import { useEffect } from "react";
import { useLocation } from "react-router";

export const useFocus = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const h1 = document.body.querySelector("h1");
    h1?.setAttribute("tabindex", "-1");
    h1?.focus();
  }, [pathname]);
};
