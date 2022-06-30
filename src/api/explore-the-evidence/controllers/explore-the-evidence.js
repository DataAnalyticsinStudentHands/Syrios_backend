'use strict';

/**
 *  explore-the-evidence controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::explore-the-evidence.explore-the-evidence', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      populate: [
        'sort.image',
        'map.image',
        'timeline.image',
        'references',
      ],
      ...ctx.query
    };

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  }
}));
