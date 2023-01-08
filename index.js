//------------------ Imports---------------------------//
const express = require("express");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./doc/swagger.options');
const scraper = require('./models/model.js')


const app = express();

//------------------- App Use MiddleWares---------------//
//We require JSon Conveter before defining our route
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var userRoute = require('./routes/companies');

//------------------- Request-------------------------//
//for homepage
app.get('/', (req, res) => {
    console.log(`${req.method} ${req.url}`);
    return res.json({ message: 'Hello There Please use localhost:3050/companies' });
});

// for API operations
app.use('/', userRoute)

//Call scrapper 
scraper();

// Auto Scrappe and save to database after 30minutes
// let timeoutId;
// const autoScrappe = async () => {
//     await scraper();
//     timeoutId = setTimeout(autoScrappe, 600000); //Maybe 10 minutes? 600000 or 30 (1800000)
// };
// timeoutId = setTimeout(autoScrappe, 600000);


// ----------------------- Swagger definitions for documentations------------------//
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js', './doc/definitions.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



/** ------------------- LISTENING PORT ------------------- */
const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});