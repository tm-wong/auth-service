'use strict';

const path = require('path');

// Read the .env file.
const env = process.env.NODE_ENV;

switch(env) {
        case 'dev':
            require('dotenv').config({ path: path.join(__dirname, '../.auth-env') });
            break;
        default:
            // docker and production (heroku)
            // environment already set
            break;
}

// Require the framework
const fastify = require('fastify');

// Require library to exit fastify process, gracefully (if possible)
const closeWithGrace = require('close-with-grace');

// Instantiate fastify with some config
const app = fastify({
    logger: { level: 'debug' }
});

// Register your application as a normal plugin.
const appService = require('./src/app');
app.register(appService);

// delay is the number of milliseconds for the graceful close to finish
// eslint-disable-next-line no-unused-vars
const closeListeners = closeWithGrace({
    delay: process.env.FASTIFY_CLOSE_GRACE_DELAY || 500
}, async function({ signal, err, manual }) {
    if (err) {
        app.log.error(err);
    }
    await app.close();
});

app.addHook('onClose', (instance, done) => {
    closeListeners.uninstall();
    done();
});

// Start listening.
app.listen({ port: process.env.PORT || 3000, host: process.env.HOST }, err => {
    if (err) {
        app.log.error(err);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }
});
