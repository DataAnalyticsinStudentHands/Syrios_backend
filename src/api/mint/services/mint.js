'use strict';

/**
 * mint service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mint.mint');
