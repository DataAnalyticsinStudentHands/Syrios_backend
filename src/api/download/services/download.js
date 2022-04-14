'use strict';

/**
 * download service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::download.download');
