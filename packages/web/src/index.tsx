import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { bootstrap } from './vendors/bootstrap';
import { io } from 'socket.io-client';

bootstrap();
const socket = io('http://localhost:3001');

socket.emit('hello', 'world');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
