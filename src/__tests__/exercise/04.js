// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {  
  const handleSubmit = jest.fn();
  
  render(<Login onSubmit={handleSubmit} />);
  // screen.debug()
  
  const username = 'Alex';
  const password = '123321';

  const usernameInput = screen.getByLabelText(/^username/i);
  const passwordInput = screen.getByLabelText(/^password/i);
  userEvent.type(usernameInput, username);
  userEvent.type(passwordInput, password);

  const button = screen.getByRole('button', { name: /^Submit$/i });
  userEvent.click(button);
  
  expect(handleSubmit).toHaveBeenCalledWith({username, password});
  expect(handleSubmit).toHaveBeenCalledTimes(1);
})

/*
eslint
  no-unused-vars: "off",
*/
