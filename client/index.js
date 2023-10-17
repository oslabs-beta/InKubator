import React from 'react';
import ReactDOM from 'react-dom'; // Correct the import statement
import App from './App';
import './styles.css'; // If the styles need to be imported, use the correct path

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

