// React and Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// CSS and Assets
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

// Render main React App
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);