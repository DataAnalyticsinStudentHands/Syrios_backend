'use strict';

/**
 *  landing-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::landing-page.landing-page', ({ strapi }) => ({
    async find(ctx) {
      ctx.query = {
        populate: [
          'image_icons',
          'image_icons.image',
        ],
        ...ctx.query
      };
  
      const { data, meta } = await super.find(ctx);
  
      return { data, meta };
    }
  }));
