'use strict';

/**
 *  timeline-info controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::timeline-info.timeline-info', ({ strapi }) =>({
  async find(ctx) {
    ctx.query = {
      populate: [
        'zone',
        'zone.event',
        'zone.coin',
        'zone.coin.reverse_file',
        'zone.coin.obverse_file',
        'zone.coin_a',
        'zone.coin_a.reverse_file',
        'zone.coin_a.obverse_file',
        'zone.coin_b',
        'zone.coin_b.reverse_file',
        'zone.coin_b.obverse_file',
      ],
      // Allow ctx.query to overwrite default behavior
      ...ctx.query
    }

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  }
}));
