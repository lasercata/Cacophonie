/**
 * @file Creates swagger doc.
 * @module docs/swagger.js
 */

const express = require('express');
const router = express.Router();

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cacophonie API',
            version: '1.0.0',
        },
    },
    apis: ['backend/api/routes/*.js']
};

const specs = swaggerJsdoc(options);

router.use(
    '/',
    swaggerUi.serve,
    swaggerUi.setup(
        specs, {
            explorer: true,
            customCssUrl: 'https://cdn.jsdelivr.net/npm/[email protected]/themes/3.x/theme-newspaper.css'
        }
    )
);

module.exports = router;
