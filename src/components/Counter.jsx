import { useSelector, useDispatch } from "react-redux";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const incrementHandler = () => {
    dispatch({ type: "increment" });
  };

  const decrementHandler = () => {
    dispatch({ type: "decrement" });
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
