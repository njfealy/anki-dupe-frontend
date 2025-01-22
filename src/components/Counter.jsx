import { useSelector, useDispatch } from "react-redux";

import { counterActions } from "../store";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <>
      <div>Count: {counter}</div>
      <button onClick={incrementHandler}>+</button>
      <button onClick={decrementHandler}>-</button>
    </>
  );
};

export default Counter;
