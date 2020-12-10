// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react';
import {render, act} from '@testing-library/react';
import useCounter from '../../components/use-counter';

test('exposes the count and increment/decrement functions', () => {
  let results;
  function UseCounterExample() {
    results = useCounter();
    return null;
  }

  render(<UseCounterExample />);

  expect(results.count).toBe(0);
  act(() => results.increment());
  expect(results.count).toBe(1);
  act(() => results.decrement());
  expect(results.count).toBe(0);
});

/* eslint no-unused-vars:0 */
