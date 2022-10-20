'use strict';

/**
 * modern-name service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::modern-name.modern-name');
