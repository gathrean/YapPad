// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import jsonData from '../docs/swaggerData.json';

function SwaggerDocs() {
  return <SwaggerUI spec={jsonData} />;
}

export default SwaggerDocs;