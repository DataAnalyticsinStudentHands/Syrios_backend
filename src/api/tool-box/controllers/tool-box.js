'use strict';

/**
 *  tool-box controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tool-box.tool-box',({strapi})=>({
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
      },
}));
