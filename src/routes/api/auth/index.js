'use strict';

const { E_STANDARD } = require('../../../errors');
const IdentityService = require('../../../services/identity');


module.exports = async(fastify/* , opts */) => {

    const { httpErrors } = fastify;
    const models = fastify.schema();
    const log = fastify.appLog('identity routes');
    const service = new IdentityService(fastify);


    /**
     * @apiDefine BadRequestError
     * @apiError (4xx) BadRequest 400
     * @apiErrorExample {json} 400 Bad Request
     *
     *      HTTP/1.1 400 Bad Request
     *      vary: Origin
     *      access-control-allow-origin: *
     *      content-type: application/json; charset=utf-8
     *      content-length: 147
     *      Date: Mon, 19 Jun 2023 17:22:14 GMT
     *      Connection: keep-alive
     *      Keep-Alive: timeout=72
     *
     *      {
     *        "status": 400,
     *        "message": "Bad Request"
     *      }
     */


    /**
     * @apiDefine UnauthorizedError
     * @apiError (4xx) Unauthorized 401
     * @apiErrorExample {json} 401 Unauthorized
     *
     *      HTTP/1.1 401 Unauthorized
     *      vary: Origin
     *      access-control-allow-origin: *
     *      content-type: application/json; charset=utf-8
     *      content-length: 147
     *      Date: Mon, 19 Jun 2023 17:22:14 GMT
     *      Connection: keep-alive
     *      Keep-Alive: timeout=72
     *
     *      {
     *        "status": 401,
     *        "message": "Unauthorized"
     *      }
     */


    /**
     * @apiDefine ForbiddenError
     * @apiError (4xx) Forbidden 403
     * @apiErrorExample {json} 403 Forbidden
     *
     *      HTTP/1.1 403 Forbidden
     *      vary: Origin
     *      access-control-allow-origin: *
     *      content-type: application/json; charset=utf-8
     *      content-length: 147
     *      Date: Mon, 19 Jun 2023 17:22:14 GMT
     *      Connection: keep-alive
     *      Keep-Alive: timeout=72
     *
     *      {
     *        "status": 403,
     *        "message": "Forbidden"
     *      }
     */


    /**
     * @apiDefine NotFoundError
     * @apiError (4xx) NotFound 404
     * @apiErrorExample {json} 404 Not Found
     *
     *      HTTP/1.1 404 Not Found
     *      vary: Origin
     *      access-control-allow-origin: *
     *      content-type: application/json; charset=utf-8
     *      content-length: 147
     *      Date: Mon, 19 Jun 2023 17:22:14 GMT
     *      Connection: keep-alive
     *      Keep-Alive: timeout=72
     *
     *      {
     *        "status": 404,
     *        "message": "Not Found"
     *      }
     */


    /**
     * @apiDefine MethodNotAlloedError
     * @apiError (4xx) MethodNotAllowed 405
     * @apiErrorExample {json} 405 Method Not Allowed
     *
     *      HTTP/1.1 405 Method Not Allowed
     *      vary: Origin
     *      access-control-allow-origin: *
     *      content-type: application/json; charset=utf-8
     *      content-length: 147
     *      Date: Mon, 19 Jun 2023 17:22:14 GMT
     *      Connection: keep-alive
     *      Keep-Alive: timeout=72
     *
     *      {
     *        "status": 405,
     *        "message": "Method Not Allowed"
     *      }
     */

    /**
     * @apiDefine InternalServerError
     * @apiError (5xx) InternalServerError 500
     * @apiErrorExample {json} 500 Internal Server Error
     *
     *      HTTP/1.1 500 Internal Server Error
     *      vary: Origin
     *      access-control-allow-origin: *
     *      content-type: application/json; charset=utf-8
     *      content-length: 147
     *      Date: Mon, 19 Jun 2023 17:22:14 GMT
     *      Connection: keep-alive
     *      Keep-Alive: timeout=72
     *
     *      {
     *        "status": 500,
     *        "message": "Internal Server Error"
     *      }
     */


    /**
     * @api {get} /api/auth 1 - Authentification
     * @apiName GetProducts
     * @apiGroup 1 - Identity
     * @apiVersion 0.0.1
     * @apiDescription Retourne un token d'authentification
     *
     * @apiExample {curl} Exemple d'utilisation:
     *
     *      curl -i -X POST \
     *      -H 'Content-Type: application/json' \
     *      -H 'Accept: application/json' \
     *      -d '{ "user_name": "efinkle0", "passw": "xxxx" }' \
     *      https://server.com/api/auth
     *
     *
     * @apiSuccessExample {json} 200 OK
     *
     *      HTTP/1.1 200 OK
     *      vary: Origin
     *      access-control-allow-origin: *
     *      content-type: application/json; charset=utf-8
     *      content-length: 988
     *      Date: Sun, 23 Jul 2023 19:57:54 GMT
     *      Connection: keep-alive
     *      Keep-Alive: timeout=72
     *
     *      {
     *        "access_token": "eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyX25h...",
     *        "expires_in": 10800,
     *        "token_type": "Bearer"
     *      }
     *
     *      export TOKEN='eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyX25hbWUiOiJlZmlua2xlMCIsImlzcyI6ImF1...'
     *
     *
     * @apiUse BadRequestError
     * @apiUse UnauthorizedError
     * @apiUse ForbiddenError
     * @apiUse NotFoundError
     * @apiUse MethodNotAlloedError
     * @apiUse InternalServerError
     *
     */
    fastify.post('/', {
        schema: {
            body: models.identity,
            response: {
                200: models.identityAuthorized,
                400: models.identityBadRequest,
                401: models.identityUnauthorized,
                404: models.identityNotFound,
                500: models.identityServerUnavailable
            }
        }
    },
    async(request/* , reply */) => {

        try {
            return await service.verify(request);
        } catch(err) {

            log.error(err);

            if (err instanceof E_STANDARD) {
                const { message = null } = err;
                throw httpErrors[err.out](message);
            }

            throw new httpErrors.serviceUnavailable();
        }

    });
};
