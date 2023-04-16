import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <MantineProvider
      theme={{ colorScheme: 'dark' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
