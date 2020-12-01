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
import {handlers} from '../../test/server-handlers';

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
});

// 🐨 get the server setup with an async function to handle the login POST request:
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

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

test(`omitting the password results in an error`, async () => {
  render(<Login />);

  const {username} = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  // omitting passowrd
  userEvent.click(screen.getByRole('button', {name: /submit/i}));
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // press `u` not update snapshot ???
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  );
});

test(`omitting the username results in an error`, async () => {
  render(<Login />);

  const {password} = buildLoginForm();

  userEvent.type(screen.getByLabelText(/password/i), password);
  // omitting username
  userEvent.click(screen.getByRole('button', {name: /submit/i}));
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"username required"`,
  );
});

test(`unknown server error displays the error message`, async () => {
  const errorMsg = `Something Wrong`;
  server.use(
    rest.post(
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({message: errorMsg}));
      },
    ),
  );

  render(<Login />);
  userEvent.click(screen.getByRole('button', {name: /submit/i}));
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  expect(screen.getByRole(`alert`)).toHaveTextContent(errorMsg);
});
