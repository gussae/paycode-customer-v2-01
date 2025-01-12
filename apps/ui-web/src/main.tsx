import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Amplify } from 'aws-amplify';
import amplifyBeConfig from './amplify-be.config.json';

console.debug(1232, { amplifyBeConfig });

Amplify.configure(amplifyBeConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
