// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useCounter from '../../components/use-counter';

function UseCounterExample({initialCount = 0}) {
  const {count, increment, decrement} = useCounter({initialCount});
  return (
    <div>
      <span>Current Count: {count}</span>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
}

test('exposes the count and increment/decrement functions', () => {
  render(<UseCounterExample />);

  const display = screen.getByText(/^Current Count/);
  const incBtn = screen.getByRole('button', {name: 'increment'});
  const decBtn = screen.getByRole('button', {name: 'decrement'});

  expect(display).toHaveTextContent(`Current Count: 0`);
  userEvent.click(incBtn);
  expect(display).toHaveTextContent(`Current Count: 1`);
  userEvent.click(decBtn);
  expect(display).toHaveTextContent(`Current Count: 0`);
});

/* eslint no-unused-vars:0 */
