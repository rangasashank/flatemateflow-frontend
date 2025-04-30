import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

dotenv.config({
  path: "./config.env",
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <App />
  </Provider>
);
