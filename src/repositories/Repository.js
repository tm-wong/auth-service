'use strict';

module.exports = class Repository {

    constructor(fastify) {
        this.db = fastify.dbClient();
    }

    get() {}
};
