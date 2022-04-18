'use strict';

/**
 *  coin controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::coin.coin', ({ strapi }) => ({
  async findOne(ctx) {
    ctx.query = {
      populate: [
        'obverseFile',
        'reverseFile',
      ],
      ...ctx.query
    };

    const { data, meta } = await super.findOne(ctx);

    return { data, meta };
  },

  async find(ctx) {
    ctx.query = {
      populate: [
        'obverseFile',
        'reverseFile',
      ],
      ...ctx.query
    };

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  }
}));
