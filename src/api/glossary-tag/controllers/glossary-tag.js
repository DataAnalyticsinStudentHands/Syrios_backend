'use strict';

/**
 *  glossary-tag controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::glossary-tag.glossary-tag',({strapi})=>({
    async find(ctx) {
        ctx.query = {
          populate: [
            'glossaries',
            'glossaries.glossaries'
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
            'glossaries.glossaries'
          ],
          ...ctx.query
        };
    
        const { data, meta } = await super.findOne(ctx);
    
        return { data, meta };
      }
}));
