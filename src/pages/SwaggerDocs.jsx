import React, { useEffect } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

function SwaggerDocs() {
  useEffect(() => {
    // Optional: Perform any additional initialization here
  }, []);

  return <SwaggerUI url="/API/v1/swagger.json" />;
}

export default SwaggerDocs;
