import swaggerJSDoc from 'swagger-jsdoc';


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Naija Escrow User Service API',
      version: '1.0.0',
      description: 'API documentation for business, admin and user related endpoints in the crowdfunding microservice',
    },
    servers: [
      {
        url: `${HOST}:${PORT}/api`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
