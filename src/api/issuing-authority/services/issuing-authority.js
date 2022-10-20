'use strict';

/**
 * issuing-authority service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::issuing-authority.issuing-authority');
