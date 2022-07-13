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
      },

      async findStartWith(ctx) {
        const entries = await strapi.db.query('api::glossary.glossary').findMany({
          where: {
            $or:[
              {term:{$startsWith: ctx.params.alphabet.toLowerCase()}}, 
              {term:{$startsWith: ctx.params.alphabet.toUpperCase()}},             
            ],},
          populate:['glossaries'],
          orderBy:'term',
        });

        ctx.body = entries
      },
      async findByTerm(ctx) {
        const entries = await strapi.db.query('api::glossary.glossary').findMany({
          where: {term:ctx.params.term},
          populate:['glossaries'],
        });
        ctx.body = entries
      },

}));
