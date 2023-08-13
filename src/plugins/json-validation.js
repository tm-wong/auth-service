'use strict';

const path = require('path');
const fp = require('fastify-plugin');
const { buildJsonSchemas } = require('fastify-zod');

// eslint-disable-next-line no-unused-vars
module.exports = fp(async(fastify, opts) => {
    fastify.decorate('schema', () => {
        const schema = require(path.join(__dirname, '../schemas/identity'));
        const models = buildJsonSchemas(schema);
        return models?.schemas?.[0]?.properties || null;
    });
});
