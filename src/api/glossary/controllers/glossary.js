'use strict';

/**
 *  glossary controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::glossary.glossary', ({strapi})=>({
    async find(ctx) {
        ctx.query = {
          populate: [
            'glossaries',
            'glossary_tag'
          ],
          pagination: {
            pageSize: 2147483647,
          },
          ...ctx.query
        };
    
        const { data, meta } = await super.find(ctx);
    
        return { data, meta };
      },
    
      async findOne(ctx) {
        ctx.query = {
          populate: [
            'glossaries', 
            'glossary_tag'
          ],
          ...ctx.query
        };
    
        const { data, meta } = await super.findOne(ctx);
    
        return { data, meta };
      }
}));
