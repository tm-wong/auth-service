'use strict';

const fp = require('fastify-plugin');

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
// eslint-disable-next-line no-unused-vars
module.exports = fp(async function(fastify, opts) {
    fastify.register(require('@fastify/sensible'), {
        errorHandler: false
    });
});
