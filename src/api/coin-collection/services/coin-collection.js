'use strict';

/**
 * coin-collection service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::coin-collection.coin-collection');
