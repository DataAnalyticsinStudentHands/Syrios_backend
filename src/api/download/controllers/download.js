'use strict';

/**
 *  download controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::download.download', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      populate: [
        'image',
      ],
      ...ctx.query
    };

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  }
}));
