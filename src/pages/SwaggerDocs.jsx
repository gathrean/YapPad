import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import jsonData from '../docs/swaggerData.json';

function SwaggerDocs() {
  return <SwaggerUI spec={jsonData} />;
}

export default SwaggerDocs;