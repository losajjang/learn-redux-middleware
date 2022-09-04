import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Counter from '../components/Counter';
import {decrease, decreaseAsync, increase, increaseAsync} from '../modules/counter';

function CounterContainer() {
  const number = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increaseAsync());
  };

  const onDecrease = () => {
    if (number === 0) {
      return;
    }
    dispatch(decreaseAsync());
  };

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
}

export default CounterContainer;
