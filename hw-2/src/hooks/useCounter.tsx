import { useState } from "react";

export const useCounter = (min: number = 0, max: number = 5, initialValue: number = 5) => {
  const [count, setCount] = useState(initialValue);

  return {
    value: count,
    increment: () => setCount(prev => prev < max ? prev + 1 : prev),
    decrement: () => setCount(prev => prev > min ? prev - 1 : prev),
    isMax: count >= max,
    isMin: count <= min
  };
};