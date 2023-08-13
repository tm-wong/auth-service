'use strict';

const log4js = require('log4js');
const fp = require('fastify-plugin');

const opts = {
    appenders: {
        console: {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: [ 'console' ],
            level: 'DEBUG'
        }
    }
};

if (process.env.NODE_ENV !== 'production') {
    opts.appenders = Object.assign({}, opts.appenders, {
        system: {
            type: 'dateFile',
            filename: '/var/log/auth-service/service.log',
            pattern: 'yyyy-MM-dd'
        }
    });
    opts.categories.default.appenders.push('system');
}

log4js.configure(opts);

// eslint-disable-next-line no-unused-vars
module.exports = fp(async(fastify, opts) => {
    fastify.decorate('appLog', (logId) => log4js.getLogger(logId));
});
