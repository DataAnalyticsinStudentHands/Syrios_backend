'use strict';

/**
 * denomination service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::denomination.denomination');
