'use client';

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocs() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">DevHub API Documentation</h1>
      {isClient ? (
        <SwaggerUI url="/api/swagger.json" />
      ) : (
        <div>Loading API documentation...</div>
      )}
    </div>
  );
}
