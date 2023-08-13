'use strict';

const Repository = require('./Repository');


module.exports = class IdentityRepository extends Repository {


    constructor(fastify) {
        super(fastify);
        this.log = fastify.appLog('IdentityRepository');
    }


    async getOne(user_name) {

        try {

            const SQL = '\
                SELECT \
                    passw, \
                    status \
                FROM identity \
                WHERE user_name = $1 ; \
            ';

            const users = await this.db.query(SQL, [ user_name ]);
            return users[0];

        } catch(err) {
            this.log.error(err);
            throw err;
        }
    }
};
