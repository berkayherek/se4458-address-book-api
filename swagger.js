const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Address Book API',
      version: '1.0.0',
      description: 'Simple in-memory address book API with Swagger'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local server' }
    ],
    components: {
      schemas: {
        Contact: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '1'
            },
            firstName: {
              type: 'string',
              example: 'Ada'
            },
            lastName: {
              type: 'string',
              example: 'Lovelace'
            },
            email: {
              type: 'string',
              example: 'ada.lovelace@example.com'
            },
            phone: {
              type: 'string',
              example: '555-1234'
            },
            tags: {
              type: 'array',
              items: {
                type: 'string'
              },
              example: ['Work']
            }
          },
          required: ['firstName', 'email']
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
