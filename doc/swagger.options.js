

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Webscrapped API With MySQL DB',
        version: '1.0.0',
        description:
            'This is a webscrapper application that generates a list of companies in Canada that sells seafood',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'Webscrapped API',
            url: 'https://webscrappedapi.typicode.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:3050',
            description: 'Development server',
        },
    ],
};

module.exports = swaggerDefinition;