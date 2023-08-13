'use strict';

// eslint-disable-next-line no-unused-vars
module.exports = async(fastify, opts) => {
    fastify.get('/', async(request, reply) => {
        reply.type('text/html');
        return reply.sendFile('index.html');
    });
};
