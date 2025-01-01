import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../store/reducers/exampleReducer';

// Define the props that your component will receive from the Redux store
interface YourComponentProps {
  value: number;
  increment: () => void;
  decrement: () => void;
}

// Your component logic using the Redux state and actions
const YourComponent: React.FC<YourComponentProps> = ({ value, increment, decrement }) => {
  return (
    <div>
      <p>Count: {value}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};

// Map Redux state to component props
const mapStateToProps = (state: any) => ({ // Assuming you'll define proper types for your state later
  value: state.value // Adjust according to your state structure
});

// Map Redux actions to component props
const mapDispatchToProps = {
  increment,
  decrement
};

// Connect component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(YourComponent);