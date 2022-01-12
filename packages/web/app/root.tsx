import React from 'react';
import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useNavigate,
} from 'remix';
import type { MetaFunction } from 'remix';

// TODO: Replace by BackToHome component
import { Button } from 'rsuite';

import globalStyles from './styles/global.css';

export const meta: MetaFunction = () => ({ title: 'RanaMC' });

const App = () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
      <React.StrictMode>
        <Outlet />
      </React.StrictMode>
      <ScrollRestoration />
      <Scripts />
      {process.env.NODE_ENV === 'development' && <LiveReload />}
    </body>
  </html>
);

export const CatchBoundary = () => {
  const navigate = useNavigate();
  const caught = useCatch();

  const handleGoBack = () => {
    navigate('../');
  };

  return (
    <html lang="en">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="not-found">
        <h1>
          {caught.status} {caught.statusText}
        </h1>
        <Button appearance="primary" onClick={handleGoBack}>
          Go Home
        </Button>
        <Scripts />
      </body>
    </html>
  );
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: globalStyles },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'use-credentials',
  },
  {
    rel: 'stylesheet',
    // eslint-disable-next-line max-len
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap',
  },
];

export default App;
