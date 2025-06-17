import swaggerJSDoc from 'swagger-jsdoc';

const PORT = process.env.PORT || 3001;
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
    components: {
      schemas: {
        // Business Schema
        Business: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60f1a0c1e1b1b2001c8d1234' },
            name: { type: 'string', example: 'Zillipay Tech Ltd.' },
            email: { type: 'string', example: 'info@zillipay.com' },
            phone: { type: 'string', example: '+2348012345678' },
            website: { type: 'string', example: 'https://zillipay.com' },
            description: { type: 'string', example: 'Fintech escrow service provider.' },
            address: { type: 'string', example: 'No. 1, Yaba Lane, Lagos' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00.000Z' },
          },
        },
        BusinessInput: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string', example: 'Zillipay Tech Ltd.' },
            email: { type: 'string', example: 'info@zillipay.com' },
            phone: { type: 'string', example: '+2348012345678' },
            website: { type: 'string', example: 'https://zillipay.com' },
            description: { type: 'string', example: 'Fintech escrow service provider.' },
            address: { type: 'string', example: 'No. 1, Yaba Lane, Lagos' },
          },
        },

        // User Schema
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '64f2f9e5c263d8d833f0ab12' },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            email: { type: 'string', example: 'john.doe@example.com' },
            phone: { type: 'string', example: '+2348012345678' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00.000Z' },
          },
        },
        CreateUserInput: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password'],
          properties: {
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            email: { type: 'string', example: 'john.doe@example.com' },
            password: { type: 'string', example: 'secret123' },
            phone: { type: 'string', example: '+2348012345678' },
          },
        },
        UpdateUserInput: {
          type: 'object',
          properties: {
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            email: { type: 'string', example: 'john.doe@example.com' },
            password: { type: 'string', example: 'secret123' },
            phone: { type: 'string', example: '+2348012345678' },
            isActive: { type: 'boolean', example: true },
          },
        },
        UserResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Successful' },
            data: { $ref: '#/components/schemas/User' },
          },
        },
        Admin: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '60f1a0c1e1b1b2001c8d5678',
            },
            firstName: {
              type: 'string',
              example: 'John',
            },
            lastName: {
              type: 'string',
              example: 'Doe',
            },
            email: {
              type: 'string',
              example: 'admin@example.com',
            },
            phone: {
              type: 'string',
              example: '+2348012345678',
            },
            password: {
              type: 'string',
              example: 'hashed_password_here',
            },
            role: {
              type: 'string',
              example: 'superadmin',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T00:00:00.000Z',
            },
          },
        },
        AdminInput: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password'],
          properties: {
            firstName: {
              type: 'string',
              example: 'John',
            },
            lastName: {
              type: 'string',
              example: 'Doe',
            },
            email: {
              type: 'string',
              example: 'admin@example.com',
            },
            password: {
              type: 'string',
              example: 'secret123',
            },
            phone: {
              type: 'string',
              example: '+2348012345678',
            },
          },
        },

      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
