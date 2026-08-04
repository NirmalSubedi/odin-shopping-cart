import { MINIMUM_QUANTITY } from "../config";

export const getValidProductQuantity = (e) => {
  return Math.max(MINIMUM_QUANTITY, Number(e.target.value));
};
