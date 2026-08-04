import { useState } from "react";

export const useCounter = (startCount) => {
  const [count, setCount] = useState(startCount);

  const increaseCount = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    return nextCount;
  };
  const decreaseCount = () => {
    const nextCount = count - 1;
    setCount(nextCount);
    return nextCount;
  };
  const resetCount = () => {
    setCount(startCount);
    return startCount;
  };

  return { count, increaseCount, decreaseCount, resetCount, setCount };
};
