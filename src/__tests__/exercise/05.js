// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {build, fake} from '@jackfranklin/test-data-bot';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import Login from '../../components/login-submission';

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
});

// 🐨 get the server setup with an async function to handle the login POST request:
const server = setupServer(
  rest.post(
    `https://auth-provider.example.com/api/login`,
    async (req, res, ctx) => {
      if (!req.body.username) {
        return res(ctx.status(400), ctx.json({message: 'username required'}));
      }
      if (!req.body.password) {
        return res(ctx.status(400), ctx.json({message: 'password required'}));
      }
      return res(ctx.json({username: req.body.username}));
    },
  ),
);

// 🐨 before all the tests, start the server with `server.listen()`
beforeAll(() => server.listen());
// 🐨 after all the tests, stop the server with `server.close()`
afterAll(() => server.close());

test(`logging in displays the user's username`, async () => {
  render(<Login />);
  const {username, password} = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);

  userEvent.click(screen.getByRole('button', {name: /submit/i}));

  // as soon as the user hits submit, we render a spinner to the screen. That
  // spinner has an aria-label of "loading" for accessibility purposes, so
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // once the login is successful, then the loading spinner disappears and
  // we render the username.
  expect(screen.getByText(username)).toBeInTheDocument();
});
