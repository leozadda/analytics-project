import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { v4 as uuidv4 } from 'uuid';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Generate or retrieve UID
const getOrCreateUID = () => {
  let uid = localStorage.getItem('visitorUID');
  if (!uid) {
    uid = uuidv4();
    localStorage.setItem('visitorUID', uid);
  }
  return uid;
};
getOrCreateUID();


root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);