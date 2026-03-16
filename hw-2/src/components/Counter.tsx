import { useCounter } from "../hooks/useCounter";


interface CounterProps {
  min?: number;
  max?: number;
  initialValue?: number;
}

export const Counter = ({min = 0, max = 5, initialValue = 5}: CounterProps) => {
    const { value, decrement, increment, isMax, isMin } = useCounter(min, max, initialValue);
    return (
      <div>
        <button 
          onClick={decrement}
          disabled={isMin}
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: isMin ? '#f0f0f0' : 'black',
            color: isMin ? '#999' : 'white',
            fontSize: '18px',
            fontWeight: 'bold'

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
          { value }
        </span>
        <button 
          onClick={increment}
          disabled={isMax}
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: isMax ? '#f0f0f0' : 'black',
            color: isMax ? '#999' : 'white',
            fontSize: '18px',
            fontWeight: 'bold'

          }}
        >
          +
        </button>
    </div>
    );
};