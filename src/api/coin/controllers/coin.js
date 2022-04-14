'use strict';

/**
 *  coin controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::coin.coin');
