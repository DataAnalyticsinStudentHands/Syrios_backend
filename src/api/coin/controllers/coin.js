'use strict';

/**
 *  coin controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::coin.coin', ({ strapi }) => ({
  async findOne(ctx) {
    ctx.query = {
      populate: [
        'obverse_file',
        'reverse_file',
        'type_category',
        'governing_power',
      ],
      ...ctx.query
    };

    const { data, meta } = await super.findOne(ctx);

    return { data, meta };
  },

  async find(ctx) {
    ctx.query = {
      populate: [
        'obverse_file',
        'reverse_file',
        'type_category',
        'governing_power',
      ],
      ...ctx.query
    };

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  }
}));
