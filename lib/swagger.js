import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DevHub API Documentation',
      version: '1.0.0',
      description: 'API documentation for the DevHub application',
      contact: {
        name: 'Juan Diaz',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'dev-hub-geek.vercel.app/api' 
          : 'http://localhost:3000/api',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
  },
  apis: ['./app/api/**/route.js'], // Path to the API docs
};

// Generate the Swagger specification
const specs = swaggerJsdoc(options);

export default specs;
