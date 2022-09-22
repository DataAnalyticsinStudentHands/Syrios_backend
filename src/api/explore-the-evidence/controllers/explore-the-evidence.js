'use strict';

/**
 *  explore-the-evidence controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::explore-the-evidence.explore-the-evidence', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      populate: [
        'image_icon',
        'image_icon.image',
      ],
      ...ctx.query
    };
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  }
}));
