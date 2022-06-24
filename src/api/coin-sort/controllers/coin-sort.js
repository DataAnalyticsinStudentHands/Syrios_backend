'use strict';

/**
 *  coin-sort controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::coin-sort.coin-sort', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      populate: [
        'arrangement_tips',
        'sorting_tips',
        'filtering_tips',
      ],
      ...ctx.query
    };

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  }
}));
