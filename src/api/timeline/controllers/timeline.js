'use strict';

/**
 *  timeline controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::timeline.timeline', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      sort: 'y_date',
      pagination: {
        pageSize: 2147483647,
      },
      // Allow ctx.query to overwrite default behavior
      ...ctx.query,
    }

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  }
}));
