'use strict';

/**
 * governing-power service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::governing-power.governing-power');
