import { useState } from "react";

export const useCounter = (startCount) => {
  const [count, setCount] = useState(startCount);

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);
  const reset = () => setCount(startCount);

  return { count, increase, decrease, reset, setCount };
};
