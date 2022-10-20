'use strict';

/**
 * stable-url service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::stable-url.stable-url');
