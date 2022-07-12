'use strict';

/**
 * tool-box router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::tool-box.tool-box');
