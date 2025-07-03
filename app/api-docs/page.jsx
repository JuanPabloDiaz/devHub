'use client';

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import './swagger-dark.css';
import { Container } from '@/components';

export default function ApiDocs() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Aplicar clase al body para los estilos personalizados
    document.body.classList.add('api-docs-page');
    
    return () => {
      document.body.classList.remove('api-docs-page');
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {isClient ? (
        <div className="swagger-wrapper bg-white dark:bg-[#161b22] p-4 rounded-lg shadow border border-gray-200 dark:border-gray-800">
          <SwaggerUI 
            url="/api/swagger.json" 
            docExpansion="list"
            defaultModelsExpandDepth={-1}
          />
        </div>
      ) : (
        <div className="text-center py-8 text-gray-600 dark:text-gray-300">Cargando documentación de API...</div>
      )}
    </div>
  );
}
