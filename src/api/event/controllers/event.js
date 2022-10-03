'use strict';

/**
 *  event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({strapi})=>({
    async find(ctx) {
        ctx.query = {
          populate: [
            'tag_subcategory1',
            'tag_subcategory2',
            'governing_powers',
            'topics'
          ],
          pagination: {
            pageSize: 100,
          },
          ...ctx.query
        };
    
        const { data, meta } = await super.find(ctx);
        return { data, meta };
      },
      async findOne(ctx) {
        ctx.query = {
          populate: [
            'tag_subcategory1',
            'tag_subcategory2',
            'governing_powers',
            'topics'
          ],
              ...ctx.query
        };
        const { data, meta } = await super.findOne(ctx);
        return { data, meta };
      }
}));
