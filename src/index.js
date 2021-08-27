import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {GistProvider} from "../src/context/gistHook";
import 'bootstrap/dist/css/bootstrap.css';
ReactDOM.render(
  <React.StrictMode>
    <GistProvider>
      <App />
    </GistProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

