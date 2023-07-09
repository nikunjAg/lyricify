import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { StyledEngineProvider } from '@mui/material';

import './index.css';
import App from './App';
import client from './graphql/apollo-client';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client} >
      <StyledEngineProvider injectFirst >
        <App />
      </StyledEngineProvider>
    </ApolloProvider>
  </React.StrictMode>
);
