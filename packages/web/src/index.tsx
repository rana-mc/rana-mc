import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import App from './components/App/App';
import { store } from './app/store';
import bootstrap from './vendors/bootstrap';
import { queryClient } from './vendors/queryClient';
import './index.css';

bootstrap();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
