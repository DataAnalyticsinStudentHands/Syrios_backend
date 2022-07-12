'use strict';

/**
 * tool-box service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tool-box.tool-box');
