'use strict';


class E_STANDARD extends Error {

    constructor(message = 'ERROR') {
        super(message);
        this.statusCode = 500;
        this.out = 'serverUnavailable';
    }
}

class E_BAD_REQUEST extends E_STANDARD {

    constructor(message = 'ERROR') {
        super(message);
        this.statusCode = 400;
        this.out = 'badRequest';
    }
}

class E_UNAUTHORIZED extends E_STANDARD {

    constructor(message = 'ERROR') {
        super(message);
        this.statusCode = 401;
        this.out = 'unauthorized';
    }
}

class E_NOT_FOUND extends E_STANDARD {

    constructor(message = 'ERROR') {
        super(message);
        this.statusCode = 404;
        this.out = 'notFound';
    }
}

class E_SERVICE_UNAVAILABLE extends E_STANDARD {

    constructor(message = 'ERROR') {
        super(message);
        this.statusCode = 500;
        this.out = 'serviceUnavailable';
    }
}


module.exports = {
    E_STANDARD,
    E_BAD_REQUEST,
    E_UNAUTHORIZED,
    E_NOT_FOUND,
    E_SERVICE_UNAVAILABLE
};
