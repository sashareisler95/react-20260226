import { useCallback } from "react";
import "../../styles/Counter.css";

interface CounterProps {
  min?: number;
  max?: number;
  value: number;
  onValueChange: (value: number) => void;
}

export const Counter = ({
  min = 0,
  max = 5,
  value,
  onValueChange
}: CounterProps) => {

  const increment = useCallback(() => {
    if (value < max) {
      onValueChange(value + 1);
    }
  }, [value, max, onValueChange]);

  const decrement = useCallback(() => {
    if (value > min) {
      onValueChange(value - 1);
    }
  }, [value, min, onValueChange]);

  const isMax = value >= max;
  const isMin = value <= min;

  return (
    <div className="counter">
      <button
        type="button"
        onClick={decrement}
        disabled={isMin}
        className={`counter-button ${isMin ? 'counter-button--disabled' : ''}`}
      >
        -
      </button>
      <span className="counter-value">
        {value}
      </span>
      <button
        type="button"
        onClick={increment}
        disabled={isMax}
        className={`counter-button ${isMax ? 'counter-button--disabled' : ''}`}
      >
        +
      </button>
    </div>
  );
};

Counter.displayName = 'Counter';
export default Counter;