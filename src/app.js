'use strict';

const path = require('path');
const AutoLoad = require('@fastify/autoload');
const cors = require('@fastify/cors');
const fastifyStatic = require('@fastify/static');

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {};

module.exports = async function(fastify, opts) {

    // Place here your custom code!

    // CORS
    await fastify.register(cors, {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Accept', 'Content-Type', 'Authorization']
    });

    // static file service for documentation
    fastify.register(fastifyStatic, {
        root: path.join(__dirname, '../apidoc')
    });

    fastify.register(fastifyStatic, {
        root: path.join(__dirname, '../apidoc/assets'),
        prefix: '/api/assets',
        wildcard: true,
        decorateReply: false
    });

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    });

    // This loads all plugins defined in routes
    // define your routes in one of these
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: Object.assign({}, opts)
    });


    // Gestion des erreurs dans la réponse HTTP
    fastify.setErrorHandler((err/* , request, reply */) => {

        const env = process.env.NODE_ENV;
        const statusCode = err.statusCode || 500;

        // si l'environnement est autre que celui de développement
        // et que l'erreur est de type 500,
        // le message d'erreur est opacifié => InternalServerError
        // de façon à ne pas laisser transparaître
        // une éventuelle faille de sécurité
        if (env !== 'dev' && statusCode === 500) {
            err.message = 'Service Unavailable';
        }

        // output de l'erreur
        throw err;
    });
};
