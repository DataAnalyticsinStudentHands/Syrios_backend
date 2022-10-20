'use strict';

/**
 * stable-url router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::stable-url.stable-url');
