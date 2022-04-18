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
        'zone.coin.reverseFile',
        'zone.coin.obverseFile',
        'zone.coin_a',
        'zone.coin_a.reverseFile',
        'zone.coin_a.obverseFile',
        'zone.coin_b',
        'zone.coin_b.reverseFile',
        'zone.coin_b.obverseFile',
      ],
      // Allow ctx.query to overwrite default behavior
      ...ctx.query
    }

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  }
}));
