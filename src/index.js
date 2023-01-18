import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

const Component = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
  
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <Component />
  </React.StrictMode>
  </Provider>
);
