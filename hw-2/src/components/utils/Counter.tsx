import { useState, useCallback } from "react";

interface CounterProps {
  min?: number;
  max?: number;
  value?: number;
  initialValue?: number;
  onValueChange?: (value: number) => void;
}

export const Counter = ({
  min = 1,
  max = 5,
  value,
  initialValue = 5,
  onValueChange
}: CounterProps) => {

  const [internalValue, setInternalValue] = useState(initialValue);

  const currentValue = value !== undefined ? value : internalValue;

  const increment = useCallback(() => {
    if (currentValue < max) {
      const newValue = currentValue + 1;
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    }
  }, [currentValue, max, value, onValueChange]);

  const decrement = useCallback(() => {
    if (currentValue > min) {
      const newValue = currentValue - 1;
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    }
  }, [currentValue, min, value, onValueChange]);

  const isMax = currentValue >= max;
  const isMin = currentValue <= min;

  const buttonBaseStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '18px',
    fontWeight: 'bold' as const,
    cursor: 'pointer'
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '10px' }}>
      <button
        type="button"
        onClick={decrement}
        disabled={isMin}
        style={{
          ...buttonBaseStyle,
          backgroundColor: isMin ? '#f0f0f0' : 'black',
          color: isMin ? '#999' : 'white',
          opacity: isMin ? 0.6 : 1
        }}
      >
        -
      </button>
      <span style={{
        minWidth: '30px',
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '0 10px'
      }}>
        {currentValue}
      </span>
      <button
        type="button"
        onClick={increment}
        disabled={isMax}
        style={{
          ...buttonBaseStyle,
          backgroundColor: isMax ? '#f0f0f0' : 'black',
          color: isMax ? '#999' : 'white',
          opacity: isMax ? 0.6 : 1
        }}
      >
        +
      </button>
    </div>
  );
};

Counter.displayName = 'Counter';
export default Counter;