// React and Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// CSS and Assets
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

// Function to load Swagger UI
function loadSwaggerUI() {
    const swaggerUIContainer = document.createElement('div');
    swaggerUIContainer.setAttribute('id', 'swagger-ui-container');
    document.body.appendChild(swaggerUIContainer);

    // Load Swagger UI
    const SwaggerUI = require('swagger-ui-react').default;
    ReactDOM.render(
        <React.StrictMode>
            <SwaggerUI url="/docs/swagger.json" />
        </React.StrictMode>,
        swaggerUIContainer
    );
}

// Render main React App
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// Call function to load Swagger UI
loadSwaggerUI();