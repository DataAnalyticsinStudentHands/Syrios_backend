'use strict';

/**
 * coin service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::coin.coin');
