// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react';
import ReactDOM from 'react-dom';
import Counter from '../../components/counter';

beforeEach(() => {
  document.body.innerHTML = '';
});

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div');
  document.body.append(div);
  ReactDOM.render(<Counter />, div);

  const [decrement, increment] = div.querySelectorAll('button');
  const message = div.firstChild.querySelector('div');

  expect(message.textContent).toBe(`Current count: 0`);
  increment.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true, // A Boolean indicating whether the event bubbles.
      cancelable: true, // A Boolean indicating whether the event can be cancelled.
      button: 0, // Main button pressed, usually the left button or the un-initialized state
    }),
  );
  expect(message.textContent).toBe(`Current count: 1`);
  decrement.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true, // A Boolean indicating whether the event bubbles.
      cancelable: true, // A Boolean indicating whether the event can be cancelled.
      button: 0, // Main button pressed, usually the left button or the un-initialized state
    }),
  );
  expect(message.textContent).toBe(`Current count: 0`);
});

/* eslint no-unused-vars:0 */
