import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container);

const theme = {
  colorScheme: 'dark',
  colors: {
    // override dark colors to change them for all components
    dark: [
      '#d5d7e0',
      '#acaebf',
      '#8c8fa3',
      '#666980',
      '#60A3EE',
      '#60A3EE',
      '#002447',
      '#001326',
      '#001C36',
      '#0c0d21',
    ],
  },
  fontFamily: 'Montserrat, sans-serif',
};

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
