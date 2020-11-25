// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { build, fake } from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password())
  }
})

test('submitting the form calls onSubmit with username and password', () => {  
  const handleSubmit = jest.fn();
  
  render(<Login onSubmit={handleSubmit} />);
  // screen.debug()
  
  const { username, password } = buildLoginForm();      

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
