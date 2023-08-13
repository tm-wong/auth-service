'use strict';

const fp = require('fastify-plugin');


const { Pool } = require('pg');
const env = process.env.NODE_ENV;

const opts = {
    dev: {
        connectionString: process.env.DATABASE_URL,
        ssl: false
    },
    production: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
};
const pool = new Pool(opts[env]);


/**
 * Ce plugin est un utilitaire
 * de connexion à la base de données
 */
// eslint-disable-next-line no-unused-vars
module.exports = fp(async function(fastify, opts) {

    // Set up
    const { log } = fastify;

    fastify.decorate('dbClient', () => {

        const query = async(sql, params = []) => {

            // Récupération d'un client depuis le pool
            // de connexions à la base de données
            const client = await pool.connect();

            try {
                // Requête
                const result = await client.query(sql, params);

                // Formattage des résultats
                const content = (result) ? result.rows : null;

                // Remise à disposition du client
                // pour les autres connexions
                // à la base de données
                client.release();

                // Output
                return content;

            } catch (err) {
                // Traitement des erreurs
                log.error('Error: database query failed');
                log.error('SQL: ' + sql);
                log.error('PARAMS ' + JSON.stringify(params));
                log.error(err);
                throw err;
            }
        };

        return { query };

    });
});
