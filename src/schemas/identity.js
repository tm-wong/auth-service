'use strict';

const { z } = require('zod');


const identity = z.object({
    user_name: z.string('This is not a valid user name.'),
    passw: z.string().max(32)
});

const identityAuthorized = z.object({
    access_token: z.string().length(917),
    expires_in: z.number().int().min(86400).default(86400),
    token_type: z.enum(['Bearer'])
});

const identityBadRequest = z.object({
    statusCode: z.enum([400]),
    error: z.enum(['Bad Request'])
});

const identityUnauthorized = z.object({
    statusCode: z.enum([401]),
    error: z.enum(['Unauthorized'])
});

const identityNotFound = z.object({
    statusCode: z.enum([404]),
    error: z.enum(['Not Found'])
});

const identityServerUnavailable = z.object({
    statusCode: z.enum([500]),
    error: z.enum(['Service Unavailable'])
});


module.exports = {
    identity,
    identityAuthorized,
    identityBadRequest,
    identityUnauthorized,
    identityNotFound,
    identityServerUnavailable
};
