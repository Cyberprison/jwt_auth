const swaggerAutogen = require('swagger-autogen')();
const { PORT } = require("./config");

const doc = {
  info: {
    version: '',            // by default: '1.0.0'
    title: 'My API', // by default: 'REST API'
    description: 'Description'      // by default: ''
  },
  host: `localhost:${PORT}`, // by default: 'localhost:3000'
  basePath: '',             // by default: '/'
  schemes: [],              // by default: ['http']
  consumes: [],             // by default: ['application/json']
  produces: [],             // by default: ['application/json']
  tags: [                   // by default: empty Array
    {
      name: '',             // Tag name
      description: ''       // Tag description
    },
    // { ... }
  ],
  securityDefinitions: { // by default: empty object
    apiKeyAuth: {
        type: 'apiKey',
        in: 'header', // can be 'header', 'query' or 'cookie'
        name: 'authorization', // name of the header, query parameter or cookie
        description: 'Some description...'
    }
  },  
  definitions: {}           // by default: empty object
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc).then(() => {
    require('./index.js'); // Your project's root file
});