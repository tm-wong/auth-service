'use strict';

const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const IdentityRepository = require('../../repositories/IdentityRepository');


/* eslint-disable no-unused-vars */
const {
    E_STANDARD,
    E_BAD_REQUEST,
    E_UNAUTHORIZED,
    E_NOT_FOUND,
    E_SERVICE_UNAVAILABLE
} = require('../../errors');
/* eslint-enable no-unused-vars */


module.exports = class IdentityService {


    constructor(fastify) {
        this.fastify = fastify;
        this.repo = new IdentityRepository(this.fastify);
        this.log = fastify.appLog('IdentityService');
    }


    payload(opts) {
        return Object.assign({}, opts, {
            iss: 'auth-service',  // issuer
            sub: opts.user_name,  // subject
            aud: 'auth-users',   // audience
            exp: Math.floor(
                new Date(new Date()
                    .setSeconds(new Date()
                        .getSeconds() + (3 * 60 * 60))
                ).getTime()
                / 1000
            ),                                          // token lasts 3 hours
            iat: Math.floor(Date.now() / 1000),         // issued at (time)
            jti: crypto.randomUUID().replace(/-/g, '')  // uniq issue identifier
        });
    }


    async sign(payload) {

        let key = null, keyPath = null;
        const { exp, iat } = payload;

        // retrieve key
        const env = process.env.NODE_ENV;

        if (env === 'dev') {
            keyPath = path.join(__dirname, process.env.PRIVATE_KEY);
            key = await fs.readFile(keyPath);
        }

        else if (env === 'docker') {
            keyPath = process.env.PRIVATE_KEY;
            key = await fs.readFile(keyPath);
        }

        else if (env === 'production') {
            key = process.env.PRIVATE_KEY;
        }

        // sign payload
        return {
            access_token: jwt.sign(
                JSON.stringify(payload),
                key,
                { algorithm: 'RS256' }
            ),
            expires_in: (exp - iat),
            token_type: 'Bearer'
        };
    }


    async check(passw, hash) {
        try {
            return await bcrypt.compare(passw, hash);
        } catch(err) {
            throw new E_UNAUTHORIZED();
        }
    }


    async verify(request) {

        const log = this.log;
        const { user_name: userName, passw } = request?.body;

        try {
            const result = await this.repo.getOne(userName);

            if (!result?.status || !result?.passw) {
                throw new E_UNAUTHORIZED();
            }

            const { passw: hash } = result;

            await this.check(passw, hash);
            log.info('user authenticated - Ok', userName);

            const payload = this.payload({ userName });
            return await this.sign(payload);

        } catch(err) {
            this.log.debug('user name', userName, 'passw', !!passw);
            this.log.error(err);
            throw err;
        }
    }

};
