'use strict';

/**
 *  research-home controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::research-home.research-home',({strapi})=>({
    async find(ctx){
        ctx.query = {
            populate: [
                'bookcover',
              ],
              ...ctx.query
        };
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    }
}));
