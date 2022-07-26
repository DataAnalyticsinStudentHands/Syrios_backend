'use strict';

/**
 *  video controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::video.video',({strapi})=>({
    async find(ctx) {
        ctx.query = {
          populate: [
            'video_thumbnail'
          ],
          pagination: {
            pageSize: 100,
          },
          ...ctx.query
        };
    
        const { data, meta } = await super.find(ctx);
    
        return { data, meta };
      },
}));
