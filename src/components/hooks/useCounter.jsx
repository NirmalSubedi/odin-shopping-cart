import { useState } from "react";

export const useCounter = (startCount) => {
  const [count, setInternalCount] = useState(startCount);

  const setCount = (val) => {
    const nextCount = val;
    setInternalCount(nextCount);
    return nextCount;
  };
  const increaseCount = () => {
    const nextCount = count + 1;
    setInternalCount(nextCount);
    return nextCount;
  };
  const decreaseCount = () => {
    const nextCount = count - 1;
    setInternalCount(nextCount);
    return nextCount;
  };
  const resetCount = () => {
    const nextCount = startCount;
    setInternalCount(nextCount);
    return nextCount;
  };

  return {
    count,
    increaseCount,
    decreaseCount,
    resetCount,
    setCount,
  };
};
