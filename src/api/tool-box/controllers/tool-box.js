'use strict';

/**
 *  tool-box controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tool-box.tool-box',({strapi})=>({
    async find(ctx) {
        ctx.query = {
          populate: [
            'read_coin.image',
            'video_library.image',
            'timeline.image',
            'glossary.image',
          ],
          ...ctx.query
        };
    
        const { data, meta } = await super.find(ctx);
    
        return { data, meta };
      },
}));
