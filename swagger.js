const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sonny API',
      version: '1.0.0',
      description: 'Currency API',
    },
  },
  apis: ['./routes/API/*.js'], // Replace with the actual path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
