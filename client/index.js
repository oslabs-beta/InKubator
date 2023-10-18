import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom'; // Correct the import statement
import App from './App';
import './styles.css'; // If the styles need to be imported, use the correct path


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />)