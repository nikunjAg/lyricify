import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material';
import { common, cyan } from '@mui/material/colors';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import client from './graphql/apollo-client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      light: cyan[50],
      dark: common.white,
      main: common.white,
      "400": cyan[50],
      "900": cyan[50],
    },
    secondary: {
      main: '#121212',
    },
    background: {
      paper: common.black,
    },
    text: {
      primary: common.white,
      secondary: cyan[50],
    },
    tonalOffset: {
      light: cyan[50],
    }
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
      <ApolloProvider client={client} >
        <BrowserRouter>
          <StyledEngineProvider injectFirst >
            <App />
          </StyledEngineProvider>
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);
