// React and Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';

// CSS and Assets
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)