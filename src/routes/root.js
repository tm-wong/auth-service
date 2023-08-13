'use strict';


// eslint-disable-next-line no-unused-vars
module.exports = async function(fastify, opts) {

    /**
     *
     */
    fastify.get('/', async function(request, reply) {

        const content = `
********************************************************************************

    Auth Servfice API

    https://github.com/tm-wong/auth-service

    T. M. Wong

********************************************************************************
`;
        reply.type('text/plain');
        return content;

    });

    /**
     * Service de fichiers statiques
     * de façon à rendre la documentation accessible
     */
    fastify.get('/doc', async function(request, reply) {

        // set up du MIME type
        reply.type('text/html');

        // output du fichier statique
        return reply.sendFile('index.html');
    });
};
