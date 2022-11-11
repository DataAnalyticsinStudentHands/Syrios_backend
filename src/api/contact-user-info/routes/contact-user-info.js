'use strict';

/**
 * contact-user-info router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::contact-user-info.contact-user-info',{
    config:{
        subscription:{
            auth:false
        }
    }
});
