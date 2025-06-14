/**
 * @file Main file. Creates the express app.
 * @module main.js
 */

const express = require('express');
const cors = require('cors');
const routes = require('./api/routes');
const path = require('path')
// const swaggerUIPath  = require('swagger-ui-express');
// const swaggerJsonFilePath  = require('./api/docs/swagger.json');

const botServices = require('./services/botService');
const botActions = require('./workers/botActions');

const app = express();
const PORT = 8042;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'../frontend/views'))

// API routes
app.use('/api', routes);

// Swagger documentation
// app.use('/api-docs', swaggerUIPath.serve, swaggerUIPath.setup(swaggerJsonFilePath));

//Home message
app.get('/', (req, res) => {
    res.send("Welcome to our Api");
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Cacaphonie server started on port ${PORT}`);

        // workers call

        //------Create all the bots from the db
        let bots = botServices.getBots();
        bots.map(bot => {botActions.createBot(bot.getId(), {status: bot.getStatus(), rivescript: bot.getRivescript()})})
    });
}

module.exports = app;
