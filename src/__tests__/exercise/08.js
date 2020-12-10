// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react';
import {render, act} from '@testing-library/react';
import useCounter from '../../components/use-counter';

function setup(hookOptions) {
  const results = {};
  function UseCounterExample() {
    Object.assign(results, useCounter(hookOptions));
    return null;
  }
  render(<UseCounterExample />);
  return results;
}

test('exposes the count and increment/decrement functions', () => {
  const results = setup();

  expect(results.count).toBe(0);
  act(() => results.increment());
  expect(results.count).toBe(1);
  act(() => results.decrement());
  expect(results.count).toBe(0);
});

test('allows customization of the initial count', () => {
  const results = setup({initialCount: 5});

  expect(results.count).toBe(5);
  act(() => results.increment());
  expect(results.count).toBe(6);
  act(() => results.decrement());
  expect(results.count).toBe(5);
});

test('allows customization of the step', () => {
  const results = setup({step: 2});

  expect(results.count).toBe(0);
  act(() => results.increment());
  expect(results.count).toBe(2);
  act(() => results.decrement());
  expect(results.count).toBe(0);
});

/* eslint no-unused-vars:0 */
